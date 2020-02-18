package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.Song;
import com.lurka.voa.repository.SongRepository;
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
 * Integration tests for the {@link SongResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class SongResourceIT {

    private static final String DEFAULT_SONG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SONG_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LYRICS = "AAAAAAAAAA";
    private static final String UPDATED_LYRICS = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHORS = "AAAAAAAAAA";
    private static final String UPDATED_AUTHORS = "BBBBBBBBBB";

    private static final String DEFAULT_SONG_METADATA = "AAAAAAAAAA";
    private static final String UPDATED_SONG_METADATA = "BBBBBBBBBB";

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;
    private static final Integer SMALLER_YEAR = 1 - 1;

    private static final String DEFAULT_SONG_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SONG_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SongRepository songRepository;

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

    private MockMvc restSongMockMvc;

    private Song song;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SongResource songResource = new SongResource(songRepository);
        this.restSongMockMvc = MockMvcBuilders.standaloneSetup(songResource)
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
    public static Song createEntity(EntityManager em) {
        Song song = new Song()
            .songName(DEFAULT_SONG_NAME)
            .lyrics(DEFAULT_LYRICS)
            .authors(DEFAULT_AUTHORS)
            .songMetadata(DEFAULT_SONG_METADATA)
            .year(DEFAULT_YEAR)
            .songDescription(DEFAULT_SONG_DESCRIPTION);
        return song;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Song createUpdatedEntity(EntityManager em) {
        Song song = new Song()
            .songName(UPDATED_SONG_NAME)
            .lyrics(UPDATED_LYRICS)
            .authors(UPDATED_AUTHORS)
            .songMetadata(UPDATED_SONG_METADATA)
            .year(UPDATED_YEAR)
            .songDescription(UPDATED_SONG_DESCRIPTION);
        return song;
    }

    @BeforeEach
    public void initTest() {
        song = createEntity(em);
    }

    @Test
    @Transactional
    public void createSong() throws Exception {
        int databaseSizeBeforeCreate = songRepository.findAll().size();

        // Create the Song
        restSongMockMvc.perform(post("/api/songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(song)))
            .andExpect(status().isCreated());

        // Validate the Song in the database
        List<Song> songList = songRepository.findAll();
        assertThat(songList).hasSize(databaseSizeBeforeCreate + 1);
        Song testSong = songList.get(songList.size() - 1);
        assertThat(testSong.getSongName()).isEqualTo(DEFAULT_SONG_NAME);
        assertThat(testSong.getLyrics()).isEqualTo(DEFAULT_LYRICS);
        assertThat(testSong.getAuthors()).isEqualTo(DEFAULT_AUTHORS);
        assertThat(testSong.getSongMetadata()).isEqualTo(DEFAULT_SONG_METADATA);
        assertThat(testSong.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testSong.getSongDescription()).isEqualTo(DEFAULT_SONG_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSongWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = songRepository.findAll().size();

        // Create the Song with an existing ID
        song.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSongMockMvc.perform(post("/api/songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(song)))
            .andExpect(status().isBadRequest());

        // Validate the Song in the database
        List<Song> songList = songRepository.findAll();
        assertThat(songList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSongNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = songRepository.findAll().size();
        // set the field null
        song.setSongName(null);

        // Create the Song, which fails.

        restSongMockMvc.perform(post("/api/songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(song)))
            .andExpect(status().isBadRequest());

        List<Song> songList = songRepository.findAll();
        assertThat(songList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSongMetadataIsRequired() throws Exception {
        int databaseSizeBeforeTest = songRepository.findAll().size();
        // set the field null
        song.setSongMetadata(null);

        // Create the Song, which fails.

        restSongMockMvc.perform(post("/api/songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(song)))
            .andExpect(status().isBadRequest());

        List<Song> songList = songRepository.findAll();
        assertThat(songList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSongs() throws Exception {
        // Initialize the database
        songRepository.saveAndFlush(song);

        // Get all the songList
        restSongMockMvc.perform(get("/api/songs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(song.getId().intValue())))
            .andExpect(jsonPath("$.[*].songName").value(hasItem(DEFAULT_SONG_NAME.toString())))
            .andExpect(jsonPath("$.[*].lyrics").value(hasItem(DEFAULT_LYRICS.toString())))
            .andExpect(jsonPath("$.[*].authors").value(hasItem(DEFAULT_AUTHORS.toString())))
            .andExpect(jsonPath("$.[*].songMetadata").value(hasItem(DEFAULT_SONG_METADATA.toString())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].songDescription").value(hasItem(DEFAULT_SONG_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getSong() throws Exception {
        // Initialize the database
        songRepository.saveAndFlush(song);

        // Get the song
        restSongMockMvc.perform(get("/api/songs/{id}", song.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(song.getId().intValue()))
            .andExpect(jsonPath("$.songName").value(DEFAULT_SONG_NAME.toString()))
            .andExpect(jsonPath("$.lyrics").value(DEFAULT_LYRICS.toString()))
            .andExpect(jsonPath("$.authors").value(DEFAULT_AUTHORS.toString()))
            .andExpect(jsonPath("$.songMetadata").value(DEFAULT_SONG_METADATA.toString()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR))
            .andExpect(jsonPath("$.songDescription").value(DEFAULT_SONG_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSong() throws Exception {
        // Get the song
        restSongMockMvc.perform(get("/api/songs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSong() throws Exception {
        // Initialize the database
        songRepository.saveAndFlush(song);

        int databaseSizeBeforeUpdate = songRepository.findAll().size();

        // Update the song
        Song updatedSong = songRepository.findById(song.getId()).get();
        // Disconnect from session so that the updates on updatedSong are not directly saved in db
        em.detach(updatedSong);
        updatedSong
            .songName(UPDATED_SONG_NAME)
            .lyrics(UPDATED_LYRICS)
            .authors(UPDATED_AUTHORS)
            .songMetadata(UPDATED_SONG_METADATA)
            .year(UPDATED_YEAR)
            .songDescription(UPDATED_SONG_DESCRIPTION);

        restSongMockMvc.perform(put("/api/songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSong)))
            .andExpect(status().isOk());

        // Validate the Song in the database
        List<Song> songList = songRepository.findAll();
        assertThat(songList).hasSize(databaseSizeBeforeUpdate);
        Song testSong = songList.get(songList.size() - 1);
        assertThat(testSong.getSongName()).isEqualTo(UPDATED_SONG_NAME);
        assertThat(testSong.getLyrics()).isEqualTo(UPDATED_LYRICS);
        assertThat(testSong.getAuthors()).isEqualTo(UPDATED_AUTHORS);
        assertThat(testSong.getSongMetadata()).isEqualTo(UPDATED_SONG_METADATA);
        assertThat(testSong.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testSong.getSongDescription()).isEqualTo(UPDATED_SONG_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSong() throws Exception {
        int databaseSizeBeforeUpdate = songRepository.findAll().size();

        // Create the Song

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSongMockMvc.perform(put("/api/songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(song)))
            .andExpect(status().isBadRequest());

        // Validate the Song in the database
        List<Song> songList = songRepository.findAll();
        assertThat(songList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSong() throws Exception {
        // Initialize the database
        songRepository.saveAndFlush(song);

        int databaseSizeBeforeDelete = songRepository.findAll().size();

        // Delete the song
        restSongMockMvc.perform(delete("/api/songs/{id}", song.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Song> songList = songRepository.findAll();
        assertThat(songList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Song.class);
        Song song1 = new Song();
        song1.setId(1L);
        Song song2 = new Song();
        song2.setId(song1.getId());
        assertThat(song1).isEqualTo(song2);
        song2.setId(2L);
        assertThat(song1).isNotEqualTo(song2);
        song1.setId(null);
        assertThat(song1).isNotEqualTo(song2);
    }
}
