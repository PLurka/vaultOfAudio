package com.lurka.voa.web.rest;

import com.lurka.voa.domain.GroupList;
import com.lurka.voa.repository.GroupListRepository;
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
 * REST controller for managing {@link com.lurka.voa.domain.GroupList}.
 */
@RestController
@RequestMapping("/api")
public class GroupListResource {

    private final Logger log = LoggerFactory.getLogger(GroupListResource.class);

    private static final String ENTITY_NAME = "groupList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GroupListRepository groupListRepository;

    public GroupListResource(GroupListRepository groupListRepository) {
        this.groupListRepository = groupListRepository;
    }

    /**
     * {@code POST  /group-lists} : Create a new groupList.
     *
     * @param groupList the groupList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new groupList, or with status {@code 400 (Bad Request)} if the groupList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/group-lists")
    public ResponseEntity<GroupList> createGroupList(@RequestBody GroupList groupList) throws URISyntaxException {
        log.debug("REST request to save GroupList : {}", groupList);
        if (groupList.getId() != null) {
            throw new BadRequestAlertException("A new groupList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GroupList result = groupListRepository.save(groupList);
        return ResponseEntity.created(new URI("/api/group-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /group-lists} : Updates an existing groupList.
     *
     * @param groupList the groupList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated groupList,
     * or with status {@code 400 (Bad Request)} if the groupList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the groupList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/group-lists")
    public ResponseEntity<GroupList> updateGroupList(@RequestBody GroupList groupList) throws URISyntaxException {
        log.debug("REST request to update GroupList : {}", groupList);
        if (groupList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GroupList result = groupListRepository.save(groupList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, groupList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /group-lists} : get all the groupLists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of groupLists in body.
     */
    @GetMapping("/group-lists")
    public List<GroupList> getAllGroupLists() {
        log.debug("REST request to get all GroupLists");
        return groupListRepository.findAll();
    }

    /**
     * {@code GET  /group-lists/:id} : get the "id" groupList.
     *
     * @param id the id of the groupList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the groupList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/group-lists/{id}")
    public ResponseEntity<GroupList> getGroupList(@PathVariable Long id) {
        log.debug("REST request to get GroupList : {}", id);
        Optional<GroupList> groupList = groupListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(groupList);
    }

    /**
     * {@code DELETE  /group-lists/:id} : delete the "id" groupList.
     *
     * @param id the id of the groupList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/group-lists/{id}")
    public ResponseEntity<Void> deleteGroupList(@PathVariable Long id) {
        log.debug("REST request to delete GroupList : {}", id);
        groupListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
