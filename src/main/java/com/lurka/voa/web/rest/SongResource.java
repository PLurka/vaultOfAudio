package com.lurka.voa.web.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lurka.voa.domain.*;
import com.lurka.voa.repository.SongRepository;
import com.lurka.voa.security.SecurityUtils;
import com.lurka.voa.web.ftp.LocalFtpClient;
import com.lurka.voa.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.compress.utils.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;

/**
 * REST controller for managing {@link com.lurka.voa.domain.Song}.
 */
@RestController
@RequestMapping("/api")
public class SongResource {

    List<String> files = new ArrayList<String>();
    private LocalFtpClient localFTPClient;

    private String server = "ftpd_server";
    private int port = 21;
    private String user = "PLurka";
    private String password = "E57paegk";

    private final Logger log = LoggerFactory.getLogger(SongResource.class);

    private static final String ENTITY_NAME = "song";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SongRepository songRepository;

    public SongResource(SongRepository songRepository) {
        this.songRepository = songRepository;
    }


    /**
     * {@code POST  /savefile} : Uploads a file to FTP.
     *
     * @param file the file to upload.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new song, or with status {@code 400 (Bad Request)} if the song has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/songs/savefile")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
                                                   String song,
                                                   String userExtra) {
        String message = "", path = "";
        try {
            try {
                Long time = new Timestamp(System.currentTimeMillis()).getTime();
                String stamp = time.toString();

                localFTPClient = new LocalFtpClient(server, port, user, password);
                localFTPClient.open();
                File ftpFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
                FileOutputStream fos = new FileOutputStream( ftpFile );
                fos.write(file.getBytes());
                fos.close();
                path = "/" + stamp + file.getOriginalFilename();
                localFTPClient.putFileToPath(ftpFile, path);
                try {
                    UserExtra userExt = new ObjectMapper().readValue(userExtra, UserExtra.class); //new UserExtra();

                    Song newSong = new ObjectMapper().readValue(song, Song.class);//new Song();
                    newSong.setSongMetadata(stamp + file.getOriginalFilename());
                    newSong.setCreatedBy(userExt);
                    HashSet userExtSet = new HashSet<>();
                    userExtSet.add(userExt);
                    newSong.setUsers(userExtSet);
                    createSong(newSong);
                }catch (Exception ex){
                    message += " PROBLEM IS CREATING SONG OR USER!: ";
                    localFTPClient.deleteFile(path);
                    throw new RuntimeException(ex.getMessage());
                }
            } catch (Exception ex) {
                throw new RuntimeException("FAIL FTP SONG OR USER!" + " EXCEPTION IS: " + ex.getMessage());
            }
            files.add(file.getOriginalFilename());

            message += "Successfully uploaded!";
            localFTPClient.close();
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message += " Failed to upload! File is: " + file.getOriginalFilename();
            try {
                localFTPClient.close();
            } catch (Exception ex){
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message + "client closed exception is: " + ex.getMessage());
            }
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message + " exception is: " + e.getMessage());
        }
    }


    /**
     * {@code POST  /songs} : Create a new song.
     *
     * @param song the song to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new song, or with status {@code 400 (Bad Request)} if the song has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/songs")
    public ResponseEntity<Song> createSong(@Valid @RequestBody Song song) throws URISyntaxException {
        log.debug("REST request to save Song : {}", song);
        if (song.getId() != null) {
            throw new BadRequestAlertException("A new song cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Song result = songRepository.save(song);
        return ResponseEntity.created(new URI("/api/songs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /songs} : Updates an existing song.
     *
     * @param song the song to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated song,
     * or with status {@code 400 (Bad Request)} if the song is not valid,
     * or with status {@code 500 (Internal Server Error)} if the song couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/songs")
    public ResponseEntity<Song> updateSong(/*@RequestParam("file")*/ MultipartFile file, @RequestParam("song") @Valid String song) throws URISyntaxException {
        Song songObject;
        try {
            songObject = new ObjectMapper().readValue(song, Song.class);
        } catch (Exception ex){
            throw new BadRequestAlertException("Invalid song object!", ENTITY_NAME, "idnull");
        }
            log.debug("REST request to update Song : {}", songObject);
            if (songObject.getId() == null) {
                throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
            }
            if(file != null){
                String path = "";
                try {
                    Long time = new Timestamp(System.currentTimeMillis()).getTime();
                    String stamp = time.toString();

                    localFTPClient = new LocalFtpClient(server, port, user, password);
                    localFTPClient.open();
                    localFTPClient.deleteFile("/"+songObject.getSongMetadata());
                    File ftpFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
                    FileOutputStream fos = new FileOutputStream( ftpFile );
                    fos.write(file.getBytes());
                    fos.close();
                    path = stamp + file.getOriginalFilename();
                    songObject.setSongMetadata(path);
                    localFTPClient.putFileToPath(ftpFile, "/" + path);
                    localFTPClient.close();
                } catch (Exception ex) {
                    throw new RuntimeException("FAIL!" + " EXCEPTION IS: " + ex.getMessage());
                }
            }
            Song result = songRepository.save(songObject);
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, songObject.getId().toString()))
                .body(result);

    }

    /**
     * {@code GET  /songs} : get all the songs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of songs in body.
     */
    @GetMapping("/songs")
    public List<Song> getAllSongs(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Songs");
        return songRepository.findAllWithEagerRelationships();
    }

    /** Returns my login */
    @GetMapping("/songs/mylogin")
    public String getMyLogin(){
        return SecurityUtils.getCurrentUserLogin().get();
    }

    /** Returns my JWT */
    @GetMapping("/songs/myjwt")
    public String getMyJWT(){
        return SecurityUtils.getCurrentUserJWT().get();
    }

    @GetMapping("/songs/stream/{path}")
    public ResponseEntity<byte[]> streamFile(@PathVariable String path){
        log.debug("REST request to get Song File : {}", path);
        String message = "";
        File songFile = new File("");
        try {
            songFile = File.createTempFile("temp",".mp3");
            songFile.deleteOnExit();
            FileOutputStream out = new FileOutputStream(songFile);
            try {
                localFTPClient = new LocalFtpClient(server, port, user, password);
                localFTPClient.open();
                InputStream inputStream = localFTPClient.streamFile("/"+path);
                IOUtils.copy(inputStream, out);
            } catch (Exception e) {
                throw new RuntimeException("FAIL!" + " EXCEPTION IS: " + e.getMessage());
            }
            message += "Successfully downloaded!";
            localFTPClient.close();
            log.debug(ResponseEntity.status(HttpStatus.OK).body(message).toString());
        } catch (Exception e) {
            message += " Failed to download! File is: " + path;
            try {
                localFTPClient.close();
            } catch (Exception ex){
                log.debug(ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message + " exception is: " + ex.getMessage()).toString());
            }
            log.debug(ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message + " exception is: " + e.getMessage()).toString());
        }
        try {
            long length = songFile.length();
            InputStreamResource inputStreamResource = new InputStreamResource( new FileInputStream(songFile));
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentLength(length);
            httpHeaders.setCacheControl(CacheControl.noCache().getHeaderValue());
            return new ResponseEntity(inputStreamResource, httpHeaders, HttpStatus.OK);
        } catch (Exception ex){
            log.error(ex.toString());
        }
        return null;
    }

    /**
     * {@code GET  /songs/:id} : get the "id" song.
     *
     * @param id the id of the song to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the song, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSong(@PathVariable Long id) {
        log.debug("REST request to get Song : {}", id);
        Optional<Song> song = songRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(song);
    }

    @GetMapping("/songs/file/{path}")
    public byte[] getSongFile(@PathVariable String path) {
        log.debug("REST request to get Song File : {}", path);
        String message = "";
        File songFile = new File("processedFile.mp3");
        try {
            try {
                localFTPClient = new LocalFtpClient(server, port, user, password);
                localFTPClient.open();
                localFTPClient.downloadToFile(path, songFile);
            } catch (Exception e) {
                throw new RuntimeException("FAIL!" + " EXCEPTION IS: " + e.getMessage());
            }
            message += "Successfully downloaded!";
            localFTPClient.close();
            log.debug(ResponseEntity.status(HttpStatus.OK).body(message).toString());
        } catch (Exception e) {
            message += " Failed to download! File is: " + path;
            try {
                localFTPClient.close();
            } catch (Exception ex){
                log.debug(ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message + " exception is: " + ex.getMessage()).toString());
            }
            log.debug(ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message + " exception is: " + e.getMessage()).toString());
        }
        try {
            // DiskFileItem fileItem = new DiskFileItem("file", Files.probeContentType(songFile.toPath()), false, songFile.getName(), (int) songFile.length(), songFile.getParentFile());
            // FileItem fileItem = new DiskFileItemFactory().createItem("file", Files.probeContentType(songFile.toPath()), false, songFile.getName());
            // fileItem.getOutputStream();
            byte[] bytesArray = new byte[(int) songFile.length()];

            FileInputStream fis = new FileInputStream(songFile);
            fis.read(bytesArray); //read file into bytes[]
            fis.close();
            // MultipartFile mpf = new MockMultipartFile("file", songFile.getName(), Files.probeContentType(songFile.toPath()), IOUtils.toByteArray(input));
            log.debug("ALL WELL bytesArray RETURNED");
            return bytesArray;
        } catch (Exception ex){
            log.error(ex.toString());
        }
        return null;
    }

    /**
     * {@code DELETE  /songs/:id} : delete the "id" song.
     *
     * @param id the id of the song to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/songs/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        log.debug("REST request to delete Song : {}", id);
        String path = "";
        try {
            localFTPClient = new LocalFtpClient(server, port, user, password);
            localFTPClient.open();
            path = "/" + songRepository.findOneWithEagerRelationships(id).get().getSongMetadata();
            localFTPClient.deleteFile(path);
        } catch (Exception ex) {
            throw new RuntimeException("FAILED TO REMOVE FILE: " + path + "with exception: " + ex.getMessage());
        }
        songRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
