package com.lurka.voa.repository;

import com.lurka.voa.domain.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Playlist entity.
 */
@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query(value = "select distinct playlist from Playlist playlist left join fetch playlist.users left join fetch playlist.songs",
        countQuery = "select count(distinct playlist) from Playlist playlist")
    Page<Playlist> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct playlist from Playlist playlist left join fetch playlist.users left join fetch playlist.songs")
    List<Playlist> findAllWithEagerRelationships();

    @Query("select playlist from Playlist playlist left join fetch playlist.users left join fetch playlist.songs where playlist.id =:id")
    Optional<Playlist> findOneWithEagerRelationships(@Param("id") Long id);

}
