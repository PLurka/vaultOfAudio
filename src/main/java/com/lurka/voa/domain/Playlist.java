package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Playlist.
 */
@Entity
@Table(name = "playlist")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Playlist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "list_name", length = 200, nullable = false)
    private String listName;

    @Size(max = 2000)
    @Column(name = "list_description", length = 2000)
    private String listDescription;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "playlist_user",
               joinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<UserExtra> users = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "playlist_song",
               joinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "song_id", referencedColumnName = "id"))
    private Set<Song> songs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("createdPlaylists")
    private UserExtra createdBy;

    @ManyToMany(mappedBy = "playlists")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Crowd> crowds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getListName() {
        return listName;
    }

    public Playlist listName(String listName) {
        this.listName = listName;
        return this;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public String getListDescription() {
        return listDescription;
    }

    public Playlist listDescription(String listDescription) {
        this.listDescription = listDescription;
        return this;
    }

    public void setListDescription(String listDescription) {
        this.listDescription = listDescription;
    }

    public Set<UserExtra> getUsers() {
        return users;
    }

    public Playlist users(Set<UserExtra> userExtras) {
        this.users = userExtras;
        return this;
    }

    public Playlist addUser(UserExtra userExtra) {
        this.users.add(userExtra);
        userExtra.getPlaylists().add(this);
        return this;
    }

    public Playlist removeUser(UserExtra userExtra) {
        this.users.remove(userExtra);
        userExtra.getPlaylists().remove(this);
        return this;
    }

    public void setUsers(Set<UserExtra> userExtras) {
        this.users = userExtras;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public Playlist songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public Playlist addSong(Song song) {
        this.songs.add(song);
        song.getPlaylists().add(this);
        return this;
    }

    public Playlist removeSong(Song song) {
        this.songs.remove(song);
        song.getPlaylists().remove(this);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public UserExtra getCreatedBy() {
        return createdBy;
    }

    public Playlist createdBy(UserExtra userExtra) {
        this.createdBy = userExtra;
        return this;
    }

    public void setCreatedBy(UserExtra userExtra) {
        this.createdBy = userExtra;
    }

    public Set<Crowd> getCrowds() {
        return crowds;
    }

    public Playlist crowds(Set<Crowd> crowds) {
        this.crowds = crowds;
        return this;
    }

    public Playlist addCrowd(Crowd crowd) {
        this.crowds.add(crowd);
        crowd.getPlaylists().add(this);
        return this;
    }

    public Playlist removeCrowd(Crowd crowd) {
        this.crowds.remove(crowd);
        crowd.getPlaylists().remove(this);
        return this;
    }

    public void setCrowds(Set<Crowd> crowds) {
        this.crowds = crowds;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Playlist)) {
            return false;
        }
        return id != null && id.equals(((Playlist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Playlist{" +
            "id=" + getId() +
            ", listName='" + getListName() + "'" +
            ", listDescription='" + getListDescription() + "'" +
            "}";
    }
}
