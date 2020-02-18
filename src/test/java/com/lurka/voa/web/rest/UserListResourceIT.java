package com.lurka.voa.web.rest;

import com.lurka.voa.VaultOfAudioApp;
import com.lurka.voa.domain.UserList;
import com.lurka.voa.repository.UserListRepository;
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
 * Integration tests for the {@link UserListResource} REST controller.
 */
@SpringBootTest(classes = VaultOfAudioApp.class)
public class UserListResourceIT {

    @Autowired
    private UserListRepository userListRepository;

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

    private MockMvc restUserListMockMvc;

    private UserList userList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserListResource userListResource = new UserListResource(userListRepository);
        this.restUserListMockMvc = MockMvcBuilders.standaloneSetup(userListResource)
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
    public static UserList createEntity(EntityManager em) {
        UserList userList = new UserList();
        return userList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserList createUpdatedEntity(EntityManager em) {
        UserList userList = new UserList();
        return userList;
    }

    @BeforeEach
    public void initTest() {
        userList = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserList() throws Exception {
        int databaseSizeBeforeCreate = userListRepository.findAll().size();

        // Create the UserList
        restUserListMockMvc.perform(post("/api/user-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userList)))
            .andExpect(status().isCreated());

        // Validate the UserList in the database
        List<UserList> userListList = userListRepository.findAll();
        assertThat(userListList).hasSize(databaseSizeBeforeCreate + 1);
        UserList testUserList = userListList.get(userListList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userListRepository.findAll().size();

        // Create the UserList with an existing ID
        userList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserListMockMvc.perform(post("/api/user-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userList)))
            .andExpect(status().isBadRequest());

        // Validate the UserList in the database
        List<UserList> userListList = userListRepository.findAll();
        assertThat(userListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserLists() throws Exception {
        // Initialize the database
        userListRepository.saveAndFlush(userList);

        // Get all the userListList
        restUserListMockMvc.perform(get("/api/user-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userList.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUserList() throws Exception {
        // Initialize the database
        userListRepository.saveAndFlush(userList);

        // Get the userList
        restUserListMockMvc.perform(get("/api/user-lists/{id}", userList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userList.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserList() throws Exception {
        // Get the userList
        restUserListMockMvc.perform(get("/api/user-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserList() throws Exception {
        // Initialize the database
        userListRepository.saveAndFlush(userList);

        int databaseSizeBeforeUpdate = userListRepository.findAll().size();

        // Update the userList
        UserList updatedUserList = userListRepository.findById(userList.getId()).get();
        // Disconnect from session so that the updates on updatedUserList are not directly saved in db
        em.detach(updatedUserList);

        restUserListMockMvc.perform(put("/api/user-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserList)))
            .andExpect(status().isOk());

        // Validate the UserList in the database
        List<UserList> userListList = userListRepository.findAll();
        assertThat(userListList).hasSize(databaseSizeBeforeUpdate);
        UserList testUserList = userListList.get(userListList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserList() throws Exception {
        int databaseSizeBeforeUpdate = userListRepository.findAll().size();

        // Create the UserList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserListMockMvc.perform(put("/api/user-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userList)))
            .andExpect(status().isBadRequest());

        // Validate the UserList in the database
        List<UserList> userListList = userListRepository.findAll();
        assertThat(userListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserList() throws Exception {
        // Initialize the database
        userListRepository.saveAndFlush(userList);

        int databaseSizeBeforeDelete = userListRepository.findAll().size();

        // Delete the userList
        restUserListMockMvc.perform(delete("/api/user-lists/{id}", userList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserList> userListList = userListRepository.findAll();
        assertThat(userListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserList.class);
        UserList userList1 = new UserList();
        userList1.setId(1L);
        UserList userList2 = new UserList();
        userList2.setId(userList1.getId());
        assertThat(userList1).isEqualTo(userList2);
        userList2.setId(2L);
        assertThat(userList1).isNotEqualTo(userList2);
        userList1.setId(null);
        assertThat(userList1).isNotEqualTo(userList2);
    }
}
