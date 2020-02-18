package com.lurka.voa.repository;

import com.lurka.voa.domain.UserList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserListRepository extends JpaRepository<UserList, Long> {

    @Query("select userList from UserList userList where userList.userId.login = ?#{principal.username}")
    List<UserList> findByUserIdIsCurrentUser();

}
