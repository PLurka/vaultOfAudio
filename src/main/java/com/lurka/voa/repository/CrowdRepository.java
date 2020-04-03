package com.lurka.voa.repository;

import com.lurka.voa.domain.Crowd;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Crowd entity.
 */
@Repository
public interface CrowdRepository extends JpaRepository<Crowd, Long> {

    @Query(value = "select distinct crowd from Crowd crowd left join fetch crowd.users left join fetch crowd.accepteds left join fetch crowd.playlists",
        countQuery = "select count(distinct crowd) from Crowd crowd")
    Page<Crowd> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct crowd from Crowd crowd left join fetch crowd.users left join fetch crowd.accepteds left join fetch crowd.playlists")
    List<Crowd> findAllWithEagerRelationships();

    @Query("select crowd from Crowd crowd left join fetch crowd.users left join fetch crowd.accepteds left join fetch crowd.playlists where crowd.id =:id")
    Optional<Crowd> findOneWithEagerRelationships(@Param("id") Long id);

}
