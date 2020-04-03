package com.lurka.voa.web.rest;

import com.lurka.voa.domain.Crowd;
import com.lurka.voa.repository.CrowdRepository;
import com.lurka.voa.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lurka.voa.domain.Crowd}.
 */
@RestController
@RequestMapping("/api")
public class CrowdResource {

    private final Logger log = LoggerFactory.getLogger(CrowdResource.class);

    private static final String ENTITY_NAME = "crowd";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CrowdRepository crowdRepository;

    public CrowdResource(CrowdRepository crowdRepository) {
        this.crowdRepository = crowdRepository;
    }

    /**
     * {@code POST  /crowds} : Create a new crowd.
     *
     * @param crowd the crowd to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crowd, or with status {@code 400 (Bad Request)} if the crowd has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/crowds")
    public ResponseEntity<Crowd> createCrowd(@Valid @RequestBody Crowd crowd) throws URISyntaxException {
        log.debug("REST request to save Crowd : {}", crowd);
        if (crowd.getId() != null) {
            throw new BadRequestAlertException("A new crowd cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Crowd result = crowdRepository.save(crowd);
        return ResponseEntity.created(new URI("/api/crowds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /crowds} : Updates an existing crowd.
     *
     * @param crowd the crowd to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crowd,
     * or with status {@code 400 (Bad Request)} if the crowd is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crowd couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/crowds")
    public ResponseEntity<Crowd> updateCrowd(@Valid @RequestBody Crowd crowd) throws URISyntaxException {
        log.debug("REST request to update Crowd : {}", crowd);
        if (crowd.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Crowd result = crowdRepository.save(crowd);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, crowd.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /crowds} : get all the crowds.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crowds in body.
     */
    @GetMapping("/crowds")
    public List<Crowd> getAllCrowds(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Crowds");
        return crowdRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /crowds/:id} : get the "id" crowd.
     *
     * @param id the id of the crowd to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crowd, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/crowds/{id}")
    public ResponseEntity<Crowd> getCrowd(@PathVariable Long id) {
        log.debug("REST request to get Crowd : {}", id);
        Optional<Crowd> crowd = crowdRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(crowd);
    }

    /**
     * {@code DELETE  /crowds/:id} : delete the "id" crowd.
     *
     * @param id the id of the crowd to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/crowds/{id}")
    public ResponseEntity<Void> deleteCrowd(@PathVariable Long id) {
        log.debug("REST request to delete Crowd : {}", id);
        crowdRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
