package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.Crowd;
import com.lurka.voa.repository.CrowdRepository;
import com.lurka.voa.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.lurka.voa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CrowdResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class CrowdResourceIT {

    private static final String DEFAULT_CROWD_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CROWD_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CROWD_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_CROWD_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_CROWD_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CROWD_PHOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CROWD_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CROWD_PHOTO_CONTENT_TYPE = "image/png";

    @Autowired
    private CrowdRepository crowdRepository;

    @Mock
    private CrowdRepository crowdRepositoryMock;

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

    private MockMvc restCrowdMockMvc;

    private Crowd crowd;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CrowdResource crowdResource = new CrowdResource(crowdRepository);
        this.restCrowdMockMvc = MockMvcBuilders.standaloneSetup(crowdResource)
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
    public static Crowd createEntity(EntityManager em) {
        Crowd crowd = new Crowd()
            .crowdName(DEFAULT_CROWD_NAME)
            .crowdDescription(DEFAULT_CROWD_DESCRIPTION)
            .crowdPhoto(DEFAULT_CROWD_PHOTO)
            .crowdPhotoContentType(DEFAULT_CROWD_PHOTO_CONTENT_TYPE);
        return crowd;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Crowd createUpdatedEntity(EntityManager em) {
        Crowd crowd = new Crowd()
            .crowdName(UPDATED_CROWD_NAME)
            .crowdDescription(UPDATED_CROWD_DESCRIPTION)
            .crowdPhoto(UPDATED_CROWD_PHOTO)
            .crowdPhotoContentType(UPDATED_CROWD_PHOTO_CONTENT_TYPE);
        return crowd;
    }

    @BeforeEach
    public void initTest() {
        crowd = createEntity(em);
    }

    @Test
    @Transactional
    public void createCrowd() throws Exception {
        int databaseSizeBeforeCreate = crowdRepository.findAll().size();

        // Create the Crowd
        restCrowdMockMvc.perform(post("/api/crowds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crowd)))
            .andExpect(status().isCreated());

        // Validate the Crowd in the database
        List<Crowd> crowdList = crowdRepository.findAll();
        assertThat(crowdList).hasSize(databaseSizeBeforeCreate + 1);
        Crowd testCrowd = crowdList.get(crowdList.size() - 1);
        assertThat(testCrowd.getCrowdName()).isEqualTo(DEFAULT_CROWD_NAME);
        assertThat(testCrowd.getCrowdDescription()).isEqualTo(DEFAULT_CROWD_DESCRIPTION);
        assertThat(testCrowd.getCrowdPhoto()).isEqualTo(DEFAULT_CROWD_PHOTO);
        assertThat(testCrowd.getCrowdPhotoContentType()).isEqualTo(DEFAULT_CROWD_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createCrowdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = crowdRepository.findAll().size();

        // Create the Crowd with an existing ID
        crowd.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrowdMockMvc.perform(post("/api/crowds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crowd)))
            .andExpect(status().isBadRequest());

        // Validate the Crowd in the database
        List<Crowd> crowdList = crowdRepository.findAll();
        assertThat(crowdList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCrowdNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = crowdRepository.findAll().size();
        // set the field null
        crowd.setCrowdName(null);

        // Create the Crowd, which fails.

        restCrowdMockMvc.perform(post("/api/crowds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crowd)))
            .andExpect(status().isBadRequest());

        List<Crowd> crowdList = crowdRepository.findAll();
        assertThat(crowdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCrowds() throws Exception {
        // Initialize the database
        crowdRepository.saveAndFlush(crowd);

        // Get all the crowdList
        restCrowdMockMvc.perform(get("/api/crowds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(crowd.getId().intValue())))
            .andExpect(jsonPath("$.[*].crowdName").value(hasItem(DEFAULT_CROWD_NAME.toString())))
            .andExpect(jsonPath("$.[*].crowdDescription").value(hasItem(DEFAULT_CROWD_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].crowdPhotoContentType").value(hasItem(DEFAULT_CROWD_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].crowdPhoto").value(hasItem(Base64Utils.encodeToString(DEFAULT_CROWD_PHOTO))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCrowdsWithEagerRelationshipsIsEnabled() throws Exception {
        CrowdResource crowdResource = new CrowdResource(crowdRepositoryMock);
        when(crowdRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCrowdMockMvc = MockMvcBuilders.standaloneSetup(crowdResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCrowdMockMvc.perform(get("/api/crowds?eagerload=true"))
        .andExpect(status().isOk());

        verify(crowdRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCrowdsWithEagerRelationshipsIsNotEnabled() throws Exception {
        CrowdResource crowdResource = new CrowdResource(crowdRepositoryMock);
            when(crowdRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCrowdMockMvc = MockMvcBuilders.standaloneSetup(crowdResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCrowdMockMvc.perform(get("/api/crowds?eagerload=true"))
        .andExpect(status().isOk());

            verify(crowdRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCrowd() throws Exception {
        // Initialize the database
        crowdRepository.saveAndFlush(crowd);

        // Get the crowd
        restCrowdMockMvc.perform(get("/api/crowds/{id}", crowd.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(crowd.getId().intValue()))
            .andExpect(jsonPath("$.crowdName").value(DEFAULT_CROWD_NAME.toString()))
            .andExpect(jsonPath("$.crowdDescription").value(DEFAULT_CROWD_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.crowdPhotoContentType").value(DEFAULT_CROWD_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.crowdPhoto").value(Base64Utils.encodeToString(DEFAULT_CROWD_PHOTO)));
    }

    @Test
    @Transactional
    public void getNonExistingCrowd() throws Exception {
        // Get the crowd
        restCrowdMockMvc.perform(get("/api/crowds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCrowd() throws Exception {
        // Initialize the database
        crowdRepository.saveAndFlush(crowd);

        int databaseSizeBeforeUpdate = crowdRepository.findAll().size();

        // Update the crowd
        Crowd updatedCrowd = crowdRepository.findById(crowd.getId()).get();
        // Disconnect from session so that the updates on updatedCrowd are not directly saved in db
        em.detach(updatedCrowd);
        updatedCrowd
            .crowdName(UPDATED_CROWD_NAME)
            .crowdDescription(UPDATED_CROWD_DESCRIPTION)
            .crowdPhoto(UPDATED_CROWD_PHOTO)
            .crowdPhotoContentType(UPDATED_CROWD_PHOTO_CONTENT_TYPE);

        restCrowdMockMvc.perform(put("/api/crowds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCrowd)))
            .andExpect(status().isOk());

        // Validate the Crowd in the database
        List<Crowd> crowdList = crowdRepository.findAll();
        assertThat(crowdList).hasSize(databaseSizeBeforeUpdate);
        Crowd testCrowd = crowdList.get(crowdList.size() - 1);
        assertThat(testCrowd.getCrowdName()).isEqualTo(UPDATED_CROWD_NAME);
        assertThat(testCrowd.getCrowdDescription()).isEqualTo(UPDATED_CROWD_DESCRIPTION);
        assertThat(testCrowd.getCrowdPhoto()).isEqualTo(UPDATED_CROWD_PHOTO);
        assertThat(testCrowd.getCrowdPhotoContentType()).isEqualTo(UPDATED_CROWD_PHOTO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCrowd() throws Exception {
        int databaseSizeBeforeUpdate = crowdRepository.findAll().size();

        // Create the Crowd

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrowdMockMvc.perform(put("/api/crowds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(crowd)))
            .andExpect(status().isBadRequest());

        // Validate the Crowd in the database
        List<Crowd> crowdList = crowdRepository.findAll();
        assertThat(crowdList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCrowd() throws Exception {
        // Initialize the database
        crowdRepository.saveAndFlush(crowd);

        int databaseSizeBeforeDelete = crowdRepository.findAll().size();

        // Delete the crowd
        restCrowdMockMvc.perform(delete("/api/crowds/{id}", crowd.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Crowd> crowdList = crowdRepository.findAll();
        assertThat(crowdList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Crowd.class);
        Crowd crowd1 = new Crowd();
        crowd1.setId(1L);
        Crowd crowd2 = new Crowd();
        crowd2.setId(crowd1.getId());
        assertThat(crowd1).isEqualTo(crowd2);
        crowd2.setId(2L);
        assertThat(crowd1).isNotEqualTo(crowd2);
        crowd1.setId(null);
        assertThat(crowd1).isNotEqualTo(crowd2);
    }
}
