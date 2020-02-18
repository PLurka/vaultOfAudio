package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ListSong.
 */
@Entity
@Table(name = "list_song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ListSong implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("listSongs")
    private Playlist listId;

    @ManyToOne
    @JsonIgnoreProperties("listSongs")
    private Song songId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Playlist getListId() {
        return listId;
    }

    public ListSong listId(Playlist playlist) {
        this.listId = playlist;
        return this;
    }

    public void setListId(Playlist playlist) {
        this.listId = playlist;
    }

    public Song getSongId() {
        return songId;
    }

    public ListSong songId(Song song) {
        this.songId = song;
        return this;
    }

    public void setSongId(Song song) {
        this.songId = song;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListSong)) {
            return false;
        }
        return id != null && id.equals(((ListSong) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ListSong{" +
            "id=" + getId() +
            "}";
    }
}
