package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.EqualizerSetting;
import com.lurka.voa.repository.EqualizerSettingRepository;
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
 * Integration tests for the {@link EqualizerSettingResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class EqualizerSettingResourceIT {

    private static final Integer DEFAULT_EQUALIZER_ID = 1;
    private static final Integer UPDATED_EQUALIZER_ID = 2;
    private static final Integer SMALLER_EQUALIZER_ID = 1 - 1;

    private static final String DEFAULT_EQUALIZER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EQUALIZER_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_FIRST = 1;
    private static final Integer UPDATED_FIRST = 2;
    private static final Integer SMALLER_FIRST = 1 - 1;

    private static final Integer DEFAULT_SECOND = 1;
    private static final Integer UPDATED_SECOND = 2;
    private static final Integer SMALLER_SECOND = 1 - 1;

    private static final Integer DEFAULT_THIRD = 1;
    private static final Integer UPDATED_THIRD = 2;
    private static final Integer SMALLER_THIRD = 1 - 1;

    private static final Integer DEFAULT_FOURTH = 1;
    private static final Integer UPDATED_FOURTH = 2;
    private static final Integer SMALLER_FOURTH = 1 - 1;

    private static final Integer DEFAULT_FIFTH = 1;
    private static final Integer UPDATED_FIFTH = 2;
    private static final Integer SMALLER_FIFTH = 1 - 1;

    private static final Integer DEFAULT_SIXTH = 1;
    private static final Integer UPDATED_SIXTH = 2;
    private static final Integer SMALLER_SIXTH = 1 - 1;

    private static final Integer DEFAULT_SEVENTH = 1;
    private static final Integer UPDATED_SEVENTH = 2;
    private static final Integer SMALLER_SEVENTH = 1 - 1;

    private static final Integer DEFAULT_EIGHT = 1;
    private static final Integer UPDATED_EIGHT = 2;
    private static final Integer SMALLER_EIGHT = 1 - 1;

    private static final Integer DEFAULT_NINTH = 1;
    private static final Integer UPDATED_NINTH = 2;
    private static final Integer SMALLER_NINTH = 1 - 1;

    private static final Integer DEFAULT_TENTH = 1;
    private static final Integer UPDATED_TENTH = 2;
    private static final Integer SMALLER_TENTH = 1 - 1;

    @Autowired
    private EqualizerSettingRepository equalizerSettingRepository;

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

    private MockMvc restEqualizerSettingMockMvc;

    private EqualizerSetting equalizerSetting;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EqualizerSettingResource equalizerSettingResource = new EqualizerSettingResource(equalizerSettingRepository);
        this.restEqualizerSettingMockMvc = MockMvcBuilders.standaloneSetup(equalizerSettingResource)
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
    public static EqualizerSetting createEntity(EntityManager em) {
        EqualizerSetting equalizerSetting = new EqualizerSetting()
            .equalizerId(DEFAULT_EQUALIZER_ID)
            .equalizerName(DEFAULT_EQUALIZER_NAME)
            .first(DEFAULT_FIRST)
            .second(DEFAULT_SECOND)
            .third(DEFAULT_THIRD)
            .fourth(DEFAULT_FOURTH)
            .fifth(DEFAULT_FIFTH)
            .sixth(DEFAULT_SIXTH)
            .seventh(DEFAULT_SEVENTH)
            .eight(DEFAULT_EIGHT)
            .ninth(DEFAULT_NINTH)
            .tenth(DEFAULT_TENTH);
        return equalizerSetting;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EqualizerSetting createUpdatedEntity(EntityManager em) {
        EqualizerSetting equalizerSetting = new EqualizerSetting()
            .equalizerId(UPDATED_EQUALIZER_ID)
            .equalizerName(UPDATED_EQUALIZER_NAME)
            .first(UPDATED_FIRST)
            .second(UPDATED_SECOND)
            .third(UPDATED_THIRD)
            .fourth(UPDATED_FOURTH)
            .fifth(UPDATED_FIFTH)
            .sixth(UPDATED_SIXTH)
            .seventh(UPDATED_SEVENTH)
            .eight(UPDATED_EIGHT)
            .ninth(UPDATED_NINTH)
            .tenth(UPDATED_TENTH);
        return equalizerSetting;
    }

    @BeforeEach
    public void initTest() {
        equalizerSetting = createEntity(em);
    }

    @Test
    @Transactional
    public void createEqualizerSetting() throws Exception {
        int databaseSizeBeforeCreate = equalizerSettingRepository.findAll().size();

        // Create the EqualizerSetting
        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isCreated());

        // Validate the EqualizerSetting in the database
        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeCreate + 1);
        EqualizerSetting testEqualizerSetting = equalizerSettingList.get(equalizerSettingList.size() - 1);
        assertThat(testEqualizerSetting.getEqualizerId()).isEqualTo(DEFAULT_EQUALIZER_ID);
        assertThat(testEqualizerSetting.getEqualizerName()).isEqualTo(DEFAULT_EQUALIZER_NAME);
        assertThat(testEqualizerSetting.getFirst()).isEqualTo(DEFAULT_FIRST);
        assertThat(testEqualizerSetting.getSecond()).isEqualTo(DEFAULT_SECOND);
        assertThat(testEqualizerSetting.getThird()).isEqualTo(DEFAULT_THIRD);
        assertThat(testEqualizerSetting.getFourth()).isEqualTo(DEFAULT_FOURTH);
        assertThat(testEqualizerSetting.getFifth()).isEqualTo(DEFAULT_FIFTH);
        assertThat(testEqualizerSetting.getSixth()).isEqualTo(DEFAULT_SIXTH);
        assertThat(testEqualizerSetting.getSeventh()).isEqualTo(DEFAULT_SEVENTH);
        assertThat(testEqualizerSetting.getEight()).isEqualTo(DEFAULT_EIGHT);
        assertThat(testEqualizerSetting.getNinth()).isEqualTo(DEFAULT_NINTH);
        assertThat(testEqualizerSetting.getTenth()).isEqualTo(DEFAULT_TENTH);
    }

    @Test
    @Transactional
    public void createEqualizerSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equalizerSettingRepository.findAll().size();

        // Create the EqualizerSetting with an existing ID
        equalizerSetting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        // Validate the EqualizerSetting in the database
        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEqualizerIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setEqualizerId(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEqualizerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setEqualizerName(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFirstIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setFirst(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSecondIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setSecond(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkThirdIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setThird(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFourthIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setFourth(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFifthIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setFifth(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSixthIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setSixth(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSeventhIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setSeventh(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEightIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setEight(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNinthIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setNinth(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTenthIsRequired() throws Exception {
        int databaseSizeBeforeTest = equalizerSettingRepository.findAll().size();
        // set the field null
        equalizerSetting.setTenth(null);

        // Create the EqualizerSetting, which fails.

        restEqualizerSettingMockMvc.perform(post("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEqualizerSettings() throws Exception {
        // Initialize the database
        equalizerSettingRepository.saveAndFlush(equalizerSetting);

        // Get all the equalizerSettingList
        restEqualizerSettingMockMvc.perform(get("/api/equalizer-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equalizerSetting.getId().intValue())))
            .andExpect(jsonPath("$.[*].equalizerId").value(hasItem(DEFAULT_EQUALIZER_ID)))
            .andExpect(jsonPath("$.[*].equalizerName").value(hasItem(DEFAULT_EQUALIZER_NAME.toString())))
            .andExpect(jsonPath("$.[*].first").value(hasItem(DEFAULT_FIRST)))
            .andExpect(jsonPath("$.[*].second").value(hasItem(DEFAULT_SECOND)))
            .andExpect(jsonPath("$.[*].third").value(hasItem(DEFAULT_THIRD)))
            .andExpect(jsonPath("$.[*].fourth").value(hasItem(DEFAULT_FOURTH)))
            .andExpect(jsonPath("$.[*].fifth").value(hasItem(DEFAULT_FIFTH)))
            .andExpect(jsonPath("$.[*].sixth").value(hasItem(DEFAULT_SIXTH)))
            .andExpect(jsonPath("$.[*].seventh").value(hasItem(DEFAULT_SEVENTH)))
            .andExpect(jsonPath("$.[*].eight").value(hasItem(DEFAULT_EIGHT)))
            .andExpect(jsonPath("$.[*].ninth").value(hasItem(DEFAULT_NINTH)))
            .andExpect(jsonPath("$.[*].tenth").value(hasItem(DEFAULT_TENTH)));
    }
    
    @Test
    @Transactional
    public void getEqualizerSetting() throws Exception {
        // Initialize the database
        equalizerSettingRepository.saveAndFlush(equalizerSetting);

        // Get the equalizerSetting
        restEqualizerSettingMockMvc.perform(get("/api/equalizer-settings/{id}", equalizerSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(equalizerSetting.getId().intValue()))
            .andExpect(jsonPath("$.equalizerId").value(DEFAULT_EQUALIZER_ID))
            .andExpect(jsonPath("$.equalizerName").value(DEFAULT_EQUALIZER_NAME.toString()))
            .andExpect(jsonPath("$.first").value(DEFAULT_FIRST))
            .andExpect(jsonPath("$.second").value(DEFAULT_SECOND))
            .andExpect(jsonPath("$.third").value(DEFAULT_THIRD))
            .andExpect(jsonPath("$.fourth").value(DEFAULT_FOURTH))
            .andExpect(jsonPath("$.fifth").value(DEFAULT_FIFTH))
            .andExpect(jsonPath("$.sixth").value(DEFAULT_SIXTH))
            .andExpect(jsonPath("$.seventh").value(DEFAULT_SEVENTH))
            .andExpect(jsonPath("$.eight").value(DEFAULT_EIGHT))
            .andExpect(jsonPath("$.ninth").value(DEFAULT_NINTH))
            .andExpect(jsonPath("$.tenth").value(DEFAULT_TENTH));
    }

    @Test
    @Transactional
    public void getNonExistingEqualizerSetting() throws Exception {
        // Get the equalizerSetting
        restEqualizerSettingMockMvc.perform(get("/api/equalizer-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEqualizerSetting() throws Exception {
        // Initialize the database
        equalizerSettingRepository.saveAndFlush(equalizerSetting);

        int databaseSizeBeforeUpdate = equalizerSettingRepository.findAll().size();

        // Update the equalizerSetting
        EqualizerSetting updatedEqualizerSetting = equalizerSettingRepository.findById(equalizerSetting.getId()).get();
        // Disconnect from session so that the updates on updatedEqualizerSetting are not directly saved in db
        em.detach(updatedEqualizerSetting);
        updatedEqualizerSetting
            .equalizerId(UPDATED_EQUALIZER_ID)
            .equalizerName(UPDATED_EQUALIZER_NAME)
            .first(UPDATED_FIRST)
            .second(UPDATED_SECOND)
            .third(UPDATED_THIRD)
            .fourth(UPDATED_FOURTH)
            .fifth(UPDATED_FIFTH)
            .sixth(UPDATED_SIXTH)
            .seventh(UPDATED_SEVENTH)
            .eight(UPDATED_EIGHT)
            .ninth(UPDATED_NINTH)
            .tenth(UPDATED_TENTH);

        restEqualizerSettingMockMvc.perform(put("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEqualizerSetting)))
            .andExpect(status().isOk());

        // Validate the EqualizerSetting in the database
        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeUpdate);
        EqualizerSetting testEqualizerSetting = equalizerSettingList.get(equalizerSettingList.size() - 1);
        assertThat(testEqualizerSetting.getEqualizerId()).isEqualTo(UPDATED_EQUALIZER_ID);
        assertThat(testEqualizerSetting.getEqualizerName()).isEqualTo(UPDATED_EQUALIZER_NAME);
        assertThat(testEqualizerSetting.getFirst()).isEqualTo(UPDATED_FIRST);
        assertThat(testEqualizerSetting.getSecond()).isEqualTo(UPDATED_SECOND);
        assertThat(testEqualizerSetting.getThird()).isEqualTo(UPDATED_THIRD);
        assertThat(testEqualizerSetting.getFourth()).isEqualTo(UPDATED_FOURTH);
        assertThat(testEqualizerSetting.getFifth()).isEqualTo(UPDATED_FIFTH);
        assertThat(testEqualizerSetting.getSixth()).isEqualTo(UPDATED_SIXTH);
        assertThat(testEqualizerSetting.getSeventh()).isEqualTo(UPDATED_SEVENTH);
        assertThat(testEqualizerSetting.getEight()).isEqualTo(UPDATED_EIGHT);
        assertThat(testEqualizerSetting.getNinth()).isEqualTo(UPDATED_NINTH);
        assertThat(testEqualizerSetting.getTenth()).isEqualTo(UPDATED_TENTH);
    }

    @Test
    @Transactional
    public void updateNonExistingEqualizerSetting() throws Exception {
        int databaseSizeBeforeUpdate = equalizerSettingRepository.findAll().size();

        // Create the EqualizerSetting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEqualizerSettingMockMvc.perform(put("/api/equalizer-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equalizerSetting)))
            .andExpect(status().isBadRequest());

        // Validate the EqualizerSetting in the database
        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEqualizerSetting() throws Exception {
        // Initialize the database
        equalizerSettingRepository.saveAndFlush(equalizerSetting);

        int databaseSizeBeforeDelete = equalizerSettingRepository.findAll().size();

        // Delete the equalizerSetting
        restEqualizerSettingMockMvc.perform(delete("/api/equalizer-settings/{id}", equalizerSetting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EqualizerSetting> equalizerSettingList = equalizerSettingRepository.findAll();
        assertThat(equalizerSettingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EqualizerSetting.class);
        EqualizerSetting equalizerSetting1 = new EqualizerSetting();
        equalizerSetting1.setId(1L);
        EqualizerSetting equalizerSetting2 = new EqualizerSetting();
        equalizerSetting2.setId(equalizerSetting1.getId());
        assertThat(equalizerSetting1).isEqualTo(equalizerSetting2);
        equalizerSetting2.setId(2L);
        assertThat(equalizerSetting1).isNotEqualTo(equalizerSetting2);
        equalizerSetting1.setId(null);
        assertThat(equalizerSetting1).isNotEqualTo(equalizerSetting2);
    }
}
