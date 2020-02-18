package com.lurka.voa.repository;

import com.lurka.voa.domain.EqualizerSetting;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EqualizerSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EqualizerSettingRepository extends JpaRepository<EqualizerSetting, Long> {

}
