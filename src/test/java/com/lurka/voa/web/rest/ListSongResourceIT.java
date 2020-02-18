package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.ListSong;
import com.lurka.voa.repository.ListSongRepository;
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
 * Integration tests for the {@link ListSongResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class ListSongResourceIT {

    @Autowired
    private ListSongRepository listSongRepository;

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

    private MockMvc restListSongMockMvc;

    private ListSong listSong;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListSongResource listSongResource = new ListSongResource(listSongRepository);
        this.restListSongMockMvc = MockMvcBuilders.standaloneSetup(listSongResource)
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
    public static ListSong createEntity(EntityManager em) {
        ListSong listSong = new ListSong();
        return listSong;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListSong createUpdatedEntity(EntityManager em) {
        ListSong listSong = new ListSong();
        return listSong;
    }

    @BeforeEach
    public void initTest() {
        listSong = createEntity(em);
    }

    @Test
    @Transactional
    public void createListSong() throws Exception {
        int databaseSizeBeforeCreate = listSongRepository.findAll().size();

        // Create the ListSong
        restListSongMockMvc.perform(post("/api/list-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listSong)))
            .andExpect(status().isCreated());

        // Validate the ListSong in the database
        List<ListSong> listSongList = listSongRepository.findAll();
        assertThat(listSongList).hasSize(databaseSizeBeforeCreate + 1);
        ListSong testListSong = listSongList.get(listSongList.size() - 1);
    }

    @Test
    @Transactional
    public void createListSongWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listSongRepository.findAll().size();

        // Create the ListSong with an existing ID
        listSong.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListSongMockMvc.perform(post("/api/list-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listSong)))
            .andExpect(status().isBadRequest());

        // Validate the ListSong in the database
        List<ListSong> listSongList = listSongRepository.findAll();
        assertThat(listSongList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllListSongs() throws Exception {
        // Initialize the database
        listSongRepository.saveAndFlush(listSong);

        // Get all the listSongList
        restListSongMockMvc.perform(get("/api/list-songs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listSong.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getListSong() throws Exception {
        // Initialize the database
        listSongRepository.saveAndFlush(listSong);

        // Get the listSong
        restListSongMockMvc.perform(get("/api/list-songs/{id}", listSong.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listSong.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingListSong() throws Exception {
        // Get the listSong
        restListSongMockMvc.perform(get("/api/list-songs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListSong() throws Exception {
        // Initialize the database
        listSongRepository.saveAndFlush(listSong);

        int databaseSizeBeforeUpdate = listSongRepository.findAll().size();

        // Update the listSong
        ListSong updatedListSong = listSongRepository.findById(listSong.getId()).get();
        // Disconnect from session so that the updates on updatedListSong are not directly saved in db
        em.detach(updatedListSong);

        restListSongMockMvc.perform(put("/api/list-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListSong)))
            .andExpect(status().isOk());

        // Validate the ListSong in the database
        List<ListSong> listSongList = listSongRepository.findAll();
        assertThat(listSongList).hasSize(databaseSizeBeforeUpdate);
        ListSong testListSong = listSongList.get(listSongList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingListSong() throws Exception {
        int databaseSizeBeforeUpdate = listSongRepository.findAll().size();

        // Create the ListSong

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListSongMockMvc.perform(put("/api/list-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listSong)))
            .andExpect(status().isBadRequest());

        // Validate the ListSong in the database
        List<ListSong> listSongList = listSongRepository.findAll();
        assertThat(listSongList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListSong() throws Exception {
        // Initialize the database
        listSongRepository.saveAndFlush(listSong);

        int databaseSizeBeforeDelete = listSongRepository.findAll().size();

        // Delete the listSong
        restListSongMockMvc.perform(delete("/api/list-songs/{id}", listSong.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ListSong> listSongList = listSongRepository.findAll();
        assertThat(listSongList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListSong.class);
        ListSong listSong1 = new ListSong();
        listSong1.setId(1L);
        ListSong listSong2 = new ListSong();
        listSong2.setId(listSong1.getId());
        assertThat(listSong1).isEqualTo(listSong2);
        listSong2.setId(2L);
        assertThat(listSong1).isNotEqualTo(listSong2);
        listSong1.setId(null);
        assertThat(listSong1).isNotEqualTo(listSong2);
    }
}
