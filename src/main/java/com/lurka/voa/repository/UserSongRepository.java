package com.lurka.voa.repository;

import com.lurka.voa.domain.UserSong;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserSong entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSongRepository extends JpaRepository<UserSong, Long> {

    @Query("select userSong from UserSong userSong where userSong.userId.login = ?#{principal.username}")
    List<UserSong> findByUserIdIsCurrentUser();

}
