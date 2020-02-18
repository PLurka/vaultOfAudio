package com.lurka.voa.repository;

import com.lurka.voa.domain.UserEqualizerSetting;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserEqualizerSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserEqualizerSettingRepository extends JpaRepository<UserEqualizerSetting, Long> {

    @Query("select userEqualizerSetting from UserEqualizerSetting userEqualizerSetting where userEqualizerSetting.userId.login = ?#{principal.username}")
    List<UserEqualizerSetting> findByUserIdIsCurrentUser();

}
