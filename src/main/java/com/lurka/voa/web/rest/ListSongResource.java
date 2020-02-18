package com.lurka.voa.web.rest;

import com.lurka.voa.domain.ListSong;
import com.lurka.voa.repository.ListSongRepository;
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
 * REST controller for managing {@link com.lurka.voa.domain.ListSong}.
 */
@RestController
@RequestMapping("/api")
public class ListSongResource {

    private final Logger log = LoggerFactory.getLogger(ListSongResource.class);

    private static final String ENTITY_NAME = "listSong";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ListSongRepository listSongRepository;

    public ListSongResource(ListSongRepository listSongRepository) {
        this.listSongRepository = listSongRepository;
    }

    /**
     * {@code POST  /list-songs} : Create a new listSong.
     *
     * @param listSong the listSong to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new listSong, or with status {@code 400 (Bad Request)} if the listSong has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/list-songs")
    public ResponseEntity<ListSong> createListSong(@RequestBody ListSong listSong) throws URISyntaxException {
        log.debug("REST request to save ListSong : {}", listSong);
        if (listSong.getId() != null) {
            throw new BadRequestAlertException("A new listSong cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListSong result = listSongRepository.save(listSong);
        return ResponseEntity.created(new URI("/api/list-songs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /list-songs} : Updates an existing listSong.
     *
     * @param listSong the listSong to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listSong,
     * or with status {@code 400 (Bad Request)} if the listSong is not valid,
     * or with status {@code 500 (Internal Server Error)} if the listSong couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/list-songs")
    public ResponseEntity<ListSong> updateListSong(@RequestBody ListSong listSong) throws URISyntaxException {
        log.debug("REST request to update ListSong : {}", listSong);
        if (listSong.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ListSong result = listSongRepository.save(listSong);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, listSong.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /list-songs} : get all the listSongs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of listSongs in body.
     */
    @GetMapping("/list-songs")
    public List<ListSong> getAllListSongs() {
        log.debug("REST request to get all ListSongs");
        return listSongRepository.findAll();
    }

    /**
     * {@code GET  /list-songs/:id} : get the "id" listSong.
     *
     * @param id the id of the listSong to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the listSong, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/list-songs/{id}")
    public ResponseEntity<ListSong> getListSong(@PathVariable Long id) {
        log.debug("REST request to get ListSong : {}", id);
        Optional<ListSong> listSong = listSongRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(listSong);
    }

    /**
     * {@code DELETE  /list-songs/:id} : delete the "id" listSong.
     *
     * @param id the id of the listSong to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/list-songs/{id}")
    public ResponseEntity<Void> deleteListSong(@PathVariable Long id) {
        log.debug("REST request to delete ListSong : {}", id);
        listSongRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
