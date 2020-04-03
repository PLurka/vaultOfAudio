package com.lurka.voa.repository;

import com.lurka.voa.domain.EqualizerSetting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the EqualizerSetting entity.
 */
@Repository
public interface EqualizerSettingRepository extends JpaRepository<EqualizerSetting, Long> {

    @Query(value = "select distinct equalizerSetting from EqualizerSetting equalizerSetting left join fetch equalizerSetting.users",
        countQuery = "select count(distinct equalizerSetting) from EqualizerSetting equalizerSetting")
    Page<EqualizerSetting> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct equalizerSetting from EqualizerSetting equalizerSetting left join fetch equalizerSetting.users")
    List<EqualizerSetting> findAllWithEagerRelationships();

    @Query("select equalizerSetting from EqualizerSetting equalizerSetting left join fetch equalizerSetting.users where equalizerSetting.id =:id")
    Optional<EqualizerSetting> findOneWithEagerRelationships(@Param("id") Long id);

}
