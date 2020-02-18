package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.GroupList;
import com.lurka.voa.repository.GroupListRepository;
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
 * Integration tests for the {@link GroupListResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class GroupListResourceIT {

    @Autowired
    private GroupListRepository groupListRepository;

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

    private MockMvc restGroupListMockMvc;

    private GroupList groupList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GroupListResource groupListResource = new GroupListResource(groupListRepository);
        this.restGroupListMockMvc = MockMvcBuilders.standaloneSetup(groupListResource)
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
    public static GroupList createEntity(EntityManager em) {
        GroupList groupList = new GroupList();
        return groupList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupList createUpdatedEntity(EntityManager em) {
        GroupList groupList = new GroupList();
        return groupList;
    }

    @BeforeEach
    public void initTest() {
        groupList = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroupList() throws Exception {
        int databaseSizeBeforeCreate = groupListRepository.findAll().size();

        // Create the GroupList
        restGroupListMockMvc.perform(post("/api/group-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupList)))
            .andExpect(status().isCreated());

        // Validate the GroupList in the database
        List<GroupList> groupListList = groupListRepository.findAll();
        assertThat(groupListList).hasSize(databaseSizeBeforeCreate + 1);
        GroupList testGroupList = groupListList.get(groupListList.size() - 1);
    }

    @Test
    @Transactional
    public void createGroupListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groupListRepository.findAll().size();

        // Create the GroupList with an existing ID
        groupList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupListMockMvc.perform(post("/api/group-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupList)))
            .andExpect(status().isBadRequest());

        // Validate the GroupList in the database
        List<GroupList> groupListList = groupListRepository.findAll();
        assertThat(groupListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGroupLists() throws Exception {
        // Initialize the database
        groupListRepository.saveAndFlush(groupList);

        // Get all the groupListList
        restGroupListMockMvc.perform(get("/api/group-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupList.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getGroupList() throws Exception {
        // Initialize the database
        groupListRepository.saveAndFlush(groupList);

        // Get the groupList
        restGroupListMockMvc.perform(get("/api/group-lists/{id}", groupList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(groupList.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGroupList() throws Exception {
        // Get the groupList
        restGroupListMockMvc.perform(get("/api/group-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupList() throws Exception {
        // Initialize the database
        groupListRepository.saveAndFlush(groupList);

        int databaseSizeBeforeUpdate = groupListRepository.findAll().size();

        // Update the groupList
        GroupList updatedGroupList = groupListRepository.findById(groupList.getId()).get();
        // Disconnect from session so that the updates on updatedGroupList are not directly saved in db
        em.detach(updatedGroupList);

        restGroupListMockMvc.perform(put("/api/group-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroupList)))
            .andExpect(status().isOk());

        // Validate the GroupList in the database
        List<GroupList> groupListList = groupListRepository.findAll();
        assertThat(groupListList).hasSize(databaseSizeBeforeUpdate);
        GroupList testGroupList = groupListList.get(groupListList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingGroupList() throws Exception {
        int databaseSizeBeforeUpdate = groupListRepository.findAll().size();

        // Create the GroupList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupListMockMvc.perform(put("/api/group-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupList)))
            .andExpect(status().isBadRequest());

        // Validate the GroupList in the database
        List<GroupList> groupListList = groupListRepository.findAll();
        assertThat(groupListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGroupList() throws Exception {
        // Initialize the database
        groupListRepository.saveAndFlush(groupList);

        int databaseSizeBeforeDelete = groupListRepository.findAll().size();

        // Delete the groupList
        restGroupListMockMvc.perform(delete("/api/group-lists/{id}", groupList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GroupList> groupListList = groupListRepository.findAll();
        assertThat(groupListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupList.class);
        GroupList groupList1 = new GroupList();
        groupList1.setId(1L);
        GroupList groupList2 = new GroupList();
        groupList2.setId(groupList1.getId());
        assertThat(groupList1).isEqualTo(groupList2);
        groupList2.setId(2L);
        assertThat(groupList1).isNotEqualTo(groupList2);
        groupList1.setId(null);
        assertThat(groupList1).isNotEqualTo(groupList2);
    }
}
