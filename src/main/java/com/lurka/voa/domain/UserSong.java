package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserSong.
 */
@Entity
@Table(name = "user_song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserSong implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("userSongs")
    private Song songId;

    @ManyToOne
    @JsonIgnoreProperties("userSongs")
    private User userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Song getSongId() {
        return songId;
    }

    public UserSong songId(Song song) {
        this.songId = song;
        return this;
    }

    public void setSongId(Song song) {
        this.songId = song;
    }

    public User getUserId() {
        return userId;
    }

    public UserSong userId(User user) {
        this.userId = user;
        return this;
    }

    public void setUserId(User user) {
        this.userId = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserSong)) {
            return false;
        }
        return id != null && id.equals(((UserSong) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserSong{" +
            "id=" + getId() +
            "}";
    }
}
