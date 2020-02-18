package com.lurka.voa.web.rest;

import com.lurka.voa.domain.UserSong;
import com.lurka.voa.repository.UserSongRepository;
import com.lurka.voa.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lurka.voa.domain.UserSong}.
 */
@RestController
@RequestMapping("/api")
public class UserSongResource {

    private final Logger log = LoggerFactory.getLogger(UserSongResource.class);

    private static final String ENTITY_NAME = "userSong";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserSongRepository userSongRepository;

    public UserSongResource(UserSongRepository userSongRepository) {
        this.userSongRepository = userSongRepository;
    }

    /**
     * {@code POST  /user-songs} : Create a new userSong.
     *
     * @param userSong the userSong to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userSong, or with status {@code 400 (Bad Request)} if the userSong has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-songs")
    public ResponseEntity<UserSong> createUserSong(@RequestBody UserSong userSong) throws URISyntaxException {
        log.debug("REST request to save UserSong : {}", userSong);
        if (userSong.getId() != null) {
            throw new BadRequestAlertException("A new userSong cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserSong result = userSongRepository.save(userSong);
        return ResponseEntity.created(new URI("/api/user-songs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-songs} : Updates an existing userSong.
     *
     * @param userSong the userSong to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userSong,
     * or with status {@code 400 (Bad Request)} if the userSong is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userSong couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-songs")
    public ResponseEntity<UserSong> updateUserSong(@RequestBody UserSong userSong) throws URISyntaxException {
        log.debug("REST request to update UserSong : {}", userSong);
        if (userSong.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserSong result = userSongRepository.save(userSong);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userSong.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-songs} : get all the userSongs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userSongs in body.
     */
    @GetMapping("/user-songs")
    public List<UserSong> getAllUserSongs() {
        log.debug("REST request to get all UserSongs");
        return userSongRepository.findAll();
    }

    /**
     * {@code GET  /user-songs/:id} : get the "id" userSong.
     *
     * @param id the id of the userSong to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userSong, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-songs/{id}")
    public ResponseEntity<UserSong> getUserSong(@PathVariable Long id) {
        log.debug("REST request to get UserSong : {}", id);
        Optional<UserSong> userSong = userSongRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userSong);
    }

    /**
     * {@code DELETE  /user-songs/:id} : delete the "id" userSong.
     *
     * @param id the id of the userSong to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-songs/{id}")
    public ResponseEntity<Void> deleteUserSong(@PathVariable Long id) {
        log.debug("REST request to delete UserSong : {}", id);
        userSongRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
