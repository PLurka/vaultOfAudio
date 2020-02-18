package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.UserSong;
import com.lurka.voa.repository.UserSongRepository;
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
 * Integration tests for the {@link UserSongResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class UserSongResourceIT {

    @Autowired
    private UserSongRepository userSongRepository;

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

    private MockMvc restUserSongMockMvc;

    private UserSong userSong;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserSongResource userSongResource = new UserSongResource(userSongRepository);
        this.restUserSongMockMvc = MockMvcBuilders.standaloneSetup(userSongResource)
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
    public static UserSong createEntity(EntityManager em) {
        UserSong userSong = new UserSong();
        return userSong;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSong createUpdatedEntity(EntityManager em) {
        UserSong userSong = new UserSong();
        return userSong;
    }

    @BeforeEach
    public void initTest() {
        userSong = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSong() throws Exception {
        int databaseSizeBeforeCreate = userSongRepository.findAll().size();

        // Create the UserSong
        restUserSongMockMvc.perform(post("/api/user-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSong)))
            .andExpect(status().isCreated());

        // Validate the UserSong in the database
        List<UserSong> userSongList = userSongRepository.findAll();
        assertThat(userSongList).hasSize(databaseSizeBeforeCreate + 1);
        UserSong testUserSong = userSongList.get(userSongList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserSongWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSongRepository.findAll().size();

        // Create the UserSong with an existing ID
        userSong.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSongMockMvc.perform(post("/api/user-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSong)))
            .andExpect(status().isBadRequest());

        // Validate the UserSong in the database
        List<UserSong> userSongList = userSongRepository.findAll();
        assertThat(userSongList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserSongs() throws Exception {
        // Initialize the database
        userSongRepository.saveAndFlush(userSong);

        // Get all the userSongList
        restUserSongMockMvc.perform(get("/api/user-songs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSong.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUserSong() throws Exception {
        // Initialize the database
        userSongRepository.saveAndFlush(userSong);

        // Get the userSong
        restUserSongMockMvc.perform(get("/api/user-songs/{id}", userSong.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userSong.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserSong() throws Exception {
        // Get the userSong
        restUserSongMockMvc.perform(get("/api/user-songs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSong() throws Exception {
        // Initialize the database
        userSongRepository.saveAndFlush(userSong);

        int databaseSizeBeforeUpdate = userSongRepository.findAll().size();

        // Update the userSong
        UserSong updatedUserSong = userSongRepository.findById(userSong.getId()).get();
        // Disconnect from session so that the updates on updatedUserSong are not directly saved in db
        em.detach(updatedUserSong);

        restUserSongMockMvc.perform(put("/api/user-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserSong)))
            .andExpect(status().isOk());

        // Validate the UserSong in the database
        List<UserSong> userSongList = userSongRepository.findAll();
        assertThat(userSongList).hasSize(databaseSizeBeforeUpdate);
        UserSong testUserSong = userSongList.get(userSongList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSong() throws Exception {
        int databaseSizeBeforeUpdate = userSongRepository.findAll().size();

        // Create the UserSong

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserSongMockMvc.perform(put("/api/user-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSong)))
            .andExpect(status().isBadRequest());

        // Validate the UserSong in the database
        List<UserSong> userSongList = userSongRepository.findAll();
        assertThat(userSongList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserSong() throws Exception {
        // Initialize the database
        userSongRepository.saveAndFlush(userSong);

        int databaseSizeBeforeDelete = userSongRepository.findAll().size();

        // Delete the userSong
        restUserSongMockMvc.perform(delete("/api/user-songs/{id}", userSong.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserSong> userSongList = userSongRepository.findAll();
        assertThat(userSongList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserSong.class);
        UserSong userSong1 = new UserSong();
        userSong1.setId(1L);
        UserSong userSong2 = new UserSong();
        userSong2.setId(userSong1.getId());
        assertThat(userSong1).isEqualTo(userSong2);
        userSong2.setId(2L);
        assertThat(userSong1).isNotEqualTo(userSong2);
        userSong1.setId(null);
        assertThat(userSong1).isNotEqualTo(userSong2);
    }
}
