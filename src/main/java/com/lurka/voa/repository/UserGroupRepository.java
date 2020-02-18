package com.lurka.voa.repository;

import com.lurka.voa.domain.UserGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {

    @Query("select userGroup from UserGroup userGroup where userGroup.userId.login = ?#{principal.username}")
    List<UserGroup> findByUserIdIsCurrentUser();

}
