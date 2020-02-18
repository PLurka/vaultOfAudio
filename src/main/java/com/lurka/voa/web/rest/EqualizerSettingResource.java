package com.lurka.voa.web.rest;

import com.lurka.voa.domain.EqualizerSetting;
import com.lurka.voa.repository.EqualizerSettingRepository;
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
 * REST controller for managing {@link com.lurka.voa.domain.EqualizerSetting}.
 */
@RestController
@RequestMapping("/api")
public class EqualizerSettingResource {

    private final Logger log = LoggerFactory.getLogger(EqualizerSettingResource.class);

    private static final String ENTITY_NAME = "equalizerSetting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EqualizerSettingRepository equalizerSettingRepository;

    public EqualizerSettingResource(EqualizerSettingRepository equalizerSettingRepository) {
        this.equalizerSettingRepository = equalizerSettingRepository;
    }

    /**
     * {@code POST  /equalizer-settings} : Create a new equalizerSetting.
     *
     * @param equalizerSetting the equalizerSetting to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new equalizerSetting, or with status {@code 400 (Bad Request)} if the equalizerSetting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/equalizer-settings")
    public ResponseEntity<EqualizerSetting> createEqualizerSetting(@Valid @RequestBody EqualizerSetting equalizerSetting) throws URISyntaxException {
        log.debug("REST request to save EqualizerSetting : {}", equalizerSetting);
        if (equalizerSetting.getId() != null) {
            throw new BadRequestAlertException("A new equalizerSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EqualizerSetting result = equalizerSettingRepository.save(equalizerSetting);
        return ResponseEntity.created(new URI("/api/equalizer-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /equalizer-settings} : Updates an existing equalizerSetting.
     *
     * @param equalizerSetting the equalizerSetting to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated equalizerSetting,
     * or with status {@code 400 (Bad Request)} if the equalizerSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the equalizerSetting couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/equalizer-settings")
    public ResponseEntity<EqualizerSetting> updateEqualizerSetting(@Valid @RequestBody EqualizerSetting equalizerSetting) throws URISyntaxException {
        log.debug("REST request to update EqualizerSetting : {}", equalizerSetting);
        if (equalizerSetting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EqualizerSetting result = equalizerSettingRepository.save(equalizerSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, equalizerSetting.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /equalizer-settings} : get all the equalizerSettings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of equalizerSettings in body.
     */
    @GetMapping("/equalizer-settings")
    public List<EqualizerSetting> getAllEqualizerSettings() {
        log.debug("REST request to get all EqualizerSettings");
        return equalizerSettingRepository.findAll();
    }

    /**
     * {@code GET  /equalizer-settings/:id} : get the "id" equalizerSetting.
     *
     * @param id the id of the equalizerSetting to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the equalizerSetting, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/equalizer-settings/{id}")
    public ResponseEntity<EqualizerSetting> getEqualizerSetting(@PathVariable Long id) {
        log.debug("REST request to get EqualizerSetting : {}", id);
        Optional<EqualizerSetting> equalizerSetting = equalizerSettingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(equalizerSetting);
    }

    /**
     * {@code DELETE  /equalizer-settings/:id} : delete the "id" equalizerSetting.
     *
     * @param id the id of the equalizerSetting to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/equalizer-settings/{id}")
    public ResponseEntity<Void> deleteEqualizerSetting(@PathVariable Long id) {
        log.debug("REST request to delete EqualizerSetting : {}", id);
        equalizerSettingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
