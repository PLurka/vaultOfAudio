package com.lurka.voa.web.rest;

import com.lurka.voa.domain.UserList;
import com.lurka.voa.repository.UserListRepository;
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
 * REST controller for managing {@link com.lurka.voa.domain.UserList}.
 */
@RestController
@RequestMapping("/api")
public class UserListResource {

    private final Logger log = LoggerFactory.getLogger(UserListResource.class);

    private static final String ENTITY_NAME = "userList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserListRepository userListRepository;

    public UserListResource(UserListRepository userListRepository) {
        this.userListRepository = userListRepository;
    }

    /**
     * {@code POST  /user-lists} : Create a new userList.
     *
     * @param userList the userList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userList, or with status {@code 400 (Bad Request)} if the userList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-lists")
    public ResponseEntity<UserList> createUserList(@RequestBody UserList userList) throws URISyntaxException {
        log.debug("REST request to save UserList : {}", userList);
        if (userList.getId() != null) {
            throw new BadRequestAlertException("A new userList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserList result = userListRepository.save(userList);
        return ResponseEntity.created(new URI("/api/user-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-lists} : Updates an existing userList.
     *
     * @param userList the userList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userList,
     * or with status {@code 400 (Bad Request)} if the userList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-lists")
    public ResponseEntity<UserList> updateUserList(@RequestBody UserList userList) throws URISyntaxException {
        log.debug("REST request to update UserList : {}", userList);
        if (userList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserList result = userListRepository.save(userList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-lists} : get all the userLists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userLists in body.
     */
    @GetMapping("/user-lists")
    public List<UserList> getAllUserLists() {
        log.debug("REST request to get all UserLists");
        return userListRepository.findAll();
    }

    /**
     * {@code GET  /user-lists/:id} : get the "id" userList.
     *
     * @param id the id of the userList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-lists/{id}")
    public ResponseEntity<UserList> getUserList(@PathVariable Long id) {
        log.debug("REST request to get UserList : {}", id);
        Optional<UserList> userList = userListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userList);
    }

    /**
     * {@code DELETE  /user-lists/:id} : delete the "id" userList.
     *
     * @param id the id of the userList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-lists/{id}")
    public ResponseEntity<Void> deleteUserList(@PathVariable Long id) {
        log.debug("REST request to delete UserList : {}", id);
        userListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
