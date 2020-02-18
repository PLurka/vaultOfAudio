package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.UserEqualizerSetting;
import com.lurka.voa.repository.UserEqualizerSettingRepository;
import com.lurka.voa.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.lurka.voa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserEqualizerSettingResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class UserEqualizerSettingResourceIT {

    @Autowired
    private UserEqualizerSettingRepository userEqualizerSettingRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUserEqualizerSettingMockMvc;

    private UserEqualizerSetting userEqualizerSetting;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserEqualizerSettingResource userEqualizerSettingResource = new UserEqualizerSettingResource(userEqualizerSettingRepository);
        this.restUserEqualizerSettingMockMvc = MockMvcBuilders.standaloneSetup(userEqualizerSettingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserEqualizerSetting createEntity(EntityManager em) {
        UserEqualizerSetting userEqualizerSetting = new UserEqualizerSetting();
        return userEqualizerSetting;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserEqualizerSetting createUpdatedEntity(EntityManager em) {
        UserEqualizerSetting userEqualizerSetting = new UserEqualizerSetting();
        return userEqualizerSetting;
    }

    @BeforeEach
    public void initTest() {
        userEqualizerSetting = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserEqualizerSetting() throws Exception {
        int databaseSizeBeforeCreate = userEqualizerSettingRepository.findAll().size();

        // Create the UserEqualizerSetting
        restUserEqualizerSettingMockMvc.perform(post("/api/user-equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userEqualizerSetting)))
            .andExpect(status().isCreated());

        // Validate the UserEqualizerSetting in the database
        List<UserEqualizerSetting> userEqualizerSettingList = userEqualizerSettingRepository.findAll();
        assertThat(userEqualizerSettingList).hasSize(databaseSizeBeforeCreate + 1);
        UserEqualizerSetting testUserEqualizerSetting = userEqualizerSettingList.get(userEqualizerSettingList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserEqualizerSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userEqualizerSettingRepository.findAll().size();

        // Create the UserEqualizerSetting with an existing ID
        userEqualizerSetting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserEqualizerSettingMockMvc.perform(post("/api/user-equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userEqualizerSetting)))
            .andExpect(status().isBadRequest());

        // Validate the UserEqualizerSetting in the database
        List<UserEqualizerSetting> userEqualizerSettingList = userEqualizerSettingRepository.findAll();
        assertThat(userEqualizerSettingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserEqualizerSettings() throws Exception {
        // Initialize the database
        userEqualizerSettingRepository.saveAndFlush(userEqualizerSetting);

        // Get all the userEqualizerSettingList
        restUserEqualizerSettingMockMvc.perform(get("/api/user-equalizer-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userEqualizerSetting.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUserEqualizerSetting() throws Exception {
        // Initialize the database
        userEqualizerSettingRepository.saveAndFlush(userEqualizerSetting);

        // Get the userEqualizerSetting
        restUserEqualizerSettingMockMvc.perform(get("/api/user-equalizer-settings/{id}", userEqualizerSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userEqualizerSetting.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserEqualizerSetting() throws Exception {
        // Get the userEqualizerSetting
        restUserEqualizerSettingMockMvc.perform(get("/api/user-equalizer-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserEqualizerSetting() throws Exception {
        // Initialize the database
        userEqualizerSettingRepository.saveAndFlush(userEqualizerSetting);

        int databaseSizeBeforeUpdate = userEqualizerSettingRepository.findAll().size();

        // Update the userEqualizerSetting
        UserEqualizerSetting updatedUserEqualizerSetting = userEqualizerSettingRepository.findById(userEqualizerSetting.getId()).get();
        // Disconnect from session so that the updates on updatedUserEqualizerSetting are not directly saved in db
        em.detach(updatedUserEqualizerSetting);

        restUserEqualizerSettingMockMvc.perform(put("/api/user-equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserEqualizerSetting)))
            .andExpect(status().isOk());

        // Validate the UserEqualizerSetting in the database
        List<UserEqualizerSetting> userEqualizerSettingList = userEqualizerSettingRepository.findAll();
        assertThat(userEqualizerSettingList).hasSize(databaseSizeBeforeUpdate);
        UserEqualizerSetting testUserEqualizerSetting = userEqualizerSettingList.get(userEqualizerSettingList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserEqualizerSetting() throws Exception {
        int databaseSizeBeforeUpdate = userEqualizerSettingRepository.findAll().size();

        // Create the UserEqualizerSetting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserEqualizerSettingMockMvc.perform(put("/api/user-equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userEqualizerSetting)))
            .andExpect(status().isBadRequest());

        // Validate the UserEqualizerSetting in the database
        List<UserEqualizerSetting> userEqualizerSettingList = userEqualizerSettingRepository.findAll();
        assertThat(userEqualizerSettingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserEqualizerSetting() throws Exception {
        // Initialize the database
        userEqualizerSettingRepository.saveAndFlush(userEqualizerSetting);

        int databaseSizeBeforeDelete = userEqualizerSettingRepository.findAll().size();

        // Delete the userEqualizerSetting
        restUserEqualizerSettingMockMvc.perform(delete("/api/user-equalizer-settings/{id}", userEqualizerSetting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserEqualizerSetting> userEqualizerSettingList = userEqualizerSettingRepository.findAll();
        assertThat(userEqualizerSettingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserEqualizerSetting.class);
        UserEqualizerSetting userEqualizerSetting1 = new UserEqualizerSetting();
        userEqualizerSetting1.setId(1L);
        UserEqualizerSetting userEqualizerSetting2 = new UserEqualizerSetting();
        userEqualizerSetting2.setId(userEqualizerSetting1.getId());
        assertThat(userEqualizerSetting1).isEqualTo(userEqualizerSetting2);
        userEqualizerSetting2.setId(2L);
        assertThat(userEqualizerSetting1).isNotEqualTo(userEqualizerSetting2);
        userEqualizerSetting1.setId(null);
        assertThat(userEqualizerSetting1).isNotEqualTo(userEqualizerSetting2);
    }
}
