package com.lurka.voa.web.rest;

import com.lurka.voa.domain.UserEqualizerSetting;
import com.lurka.voa.repository.UserEqualizerSettingRepository;
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
 * REST controller for managing {@link com.lurka.voa.domain.UserEqualizerSetting}.
 */
@RestController
@RequestMapping("/api")
public class UserEqualizerSettingResource {

    private final Logger log = LoggerFactory.getLogger(UserEqualizerSettingResource.class);

    private static final String ENTITY_NAME = "userEqualizerSetting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserEqualizerSettingRepository userEqualizerSettingRepository;

    public UserEqualizerSettingResource(UserEqualizerSettingRepository userEqualizerSettingRepository) {
        this.userEqualizerSettingRepository = userEqualizerSettingRepository;
    }

    /**
     * {@code POST  /user-equalizer-settings} : Create a new userEqualizerSetting.
     *
     * @param userEqualizerSetting the userEqualizerSetting to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userEqualizerSetting, or with status {@code 400 (Bad Request)} if the userEqualizerSetting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-equalizer-settings")
    public ResponseEntity<UserEqualizerSetting> createUserEqualizerSetting(@RequestBody UserEqualizerSetting userEqualizerSetting) throws URISyntaxException {
        log.debug("REST request to save UserEqualizerSetting : {}", userEqualizerSetting);
        if (userEqualizerSetting.getId() != null) {
            throw new BadRequestAlertException("A new userEqualizerSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserEqualizerSetting result = userEqualizerSettingRepository.save(userEqualizerSetting);
        return ResponseEntity.created(new URI("/api/user-equalizer-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-equalizer-settings} : Updates an existing userEqualizerSetting.
     *
     * @param userEqualizerSetting the userEqualizerSetting to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userEqualizerSetting,
     * or with status {@code 400 (Bad Request)} if the userEqualizerSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userEqualizerSetting couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-equalizer-settings")
    public ResponseEntity<UserEqualizerSetting> updateUserEqualizerSetting(@RequestBody UserEqualizerSetting userEqualizerSetting) throws URISyntaxException {
        log.debug("REST request to update UserEqualizerSetting : {}", userEqualizerSetting);
        if (userEqualizerSetting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserEqualizerSetting result = userEqualizerSettingRepository.save(userEqualizerSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userEqualizerSetting.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-equalizer-settings} : get all the userEqualizerSettings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userEqualizerSettings in body.
     */
    @GetMapping("/user-equalizer-settings")
    public List<UserEqualizerSetting> getAllUserEqualizerSettings() {
        log.debug("REST request to get all UserEqualizerSettings");
        return userEqualizerSettingRepository.findAll();
    }

    /**
     * {@code GET  /user-equalizer-settings/:id} : get the "id" userEqualizerSetting.
     *
     * @param id the id of the userEqualizerSetting to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userEqualizerSetting, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-equalizer-settings/{id}")
    public ResponseEntity<UserEqualizerSetting> getUserEqualizerSetting(@PathVariable Long id) {
        log.debug("REST request to get UserEqualizerSetting : {}", id);
        Optional<UserEqualizerSetting> userEqualizerSetting = userEqualizerSettingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userEqualizerSetting);
    }

    /**
     * {@code DELETE  /user-equalizer-settings/:id} : delete the "id" userEqualizerSetting.
     *
     * @param id the id of the userEqualizerSetting to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-equalizer-settings/{id}")
    public ResponseEntity<Void> deleteUserEqualizerSetting(@PathVariable Long id) {
        log.debug("REST request to delete UserEqualizerSetting : {}", id);
        userEqualizerSettingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
