package com.lurka.voa.web.rest;

import com.lurka.voa.domain.Song;
import com.lurka.voa.repository.SongRepository;
import com.lurka.voa.security.SecurityUtils;
import com.lurka.voa.service.UserService;
import com.lurka.voa.web.ftp.LocalFtpClient;
import com.lurka.voa.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;


import javax.validation.Valid;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URI;
import java.net.URISyntaxException;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lurka.voa.domain.Song}.
 */
@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:4200")
//@Controller
public class SongResource {

    List<String> files = new ArrayList<String>();
//    private final Path rootLocation = Paths.get("_Path_To_Save_The_File");
    private final Path rootLocation = Paths.get("/downloaded/");
    private LocalFtpClient localFTPClient;

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
                                                   String id,
                                                   String songName,
                                                   String lyrics,
                                                   String authors,
                                                   String songMetadata,
                                                   String year,
                                                   String songDescription) {
        String message = "";
        try {
            try {
                Long time = new Timestamp(System.currentTimeMillis()).getTime();
                String stamp = time.toString();

                Song song = new Song();
                song.setSongName(songName);
                song.setLyrics(lyrics);
                song.setAuthors(authors);
                song.setSongMetadata(stamp + file.getOriginalFilename());
                song.setYear(Integer.parseInt(year));
                song.setSongDescription(songDescription);
                createSong(song);

                localFTPClient = new LocalFtpClient("localhost", 21, "PLurka", "E57paegk");
                localFTPClient.open();
                File ftpFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
                FileOutputStream fos = new FileOutputStream( ftpFile );
                fos.write(file.getBytes());
                fos.close();
                localFTPClient.putFileToPath(ftpFile, "/" + stamp + file.getOriginalFilename());

            } catch (Exception e) {
                throw new RuntimeException("FAIL!" + " EXCEPTION IS: " + e.getMessage());
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
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message + " exception is: " + ex.getMessage());
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
    public ResponseEntity<Song> updateSong(@Valid @RequestBody Song song) throws URISyntaxException {
        log.debug("REST request to update Song : {}", song);
        if (song.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Song result = songRepository.save(song);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, song.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /songs} : get all the songs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of songs in body.
     */
    @GetMapping("/songs")
    public List<Song> getAllSongs() {
        log.debug("REST request to get all Songs");
        return songRepository.findAll();
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

    /**
     * {@code GET  /songs/:id} : get the "id" song.
     *
     * @param id the id of the song to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the song, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSong(@PathVariable Long id) {
        log.debug("REST request to get Song : {}", id);
        Optional<Song> song = songRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(song);
    }

    @GetMapping("/songs/file/{path}")
    public byte[] getSongFile(@PathVariable String path) {
        log.debug("REST request to get Song File : {}", path);
        String message = "";
        File songFile = new File("processedFile.mp3");
        try {
            try {
                localFTPClient = new LocalFtpClient("localhost", 21, "PLurka", "E57paegk");
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
        songRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
