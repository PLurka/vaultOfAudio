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
 * A Song.
 */
@Entity
@Table(name = "song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "song_name", length = 200, nullable = false)
    private String songName;

    @Size(max = 2000)
    @Column(name = "lyrics", length = 2000)
    private String lyrics;

    @Size(max = 100)
    @Column(name = "authors", length = 100)
    private String authors;

    @NotNull
    @Size(max = 500)
    @Column(name = "song_metadata", length = 500, nullable = false)
    private String songMetadata;

    @Column(name = "year")
    private Integer year;

    @Size(max = 2000)
    @Column(name = "song_description", length = 2000)
    private String songDescription;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "song_user",
               joinColumns = @JoinColumn(name = "song_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<UserExtra> users = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("createdSongs")
    private UserExtra createdBy;

    @ManyToMany(mappedBy = "songs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Playlist> playlists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSongName() {
        return songName;
    }

    public Song songName(String songName) {
        this.songName = songName;
        return this;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getLyrics() {
        return lyrics;
    }

    public Song lyrics(String lyrics) {
        this.lyrics = lyrics;
        return this;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public String getAuthors() {
        return authors;
    }

    public Song authors(String authors) {
        this.authors = authors;
        return this;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getSongMetadata() {
        return songMetadata;
    }

    public Song songMetadata(String songMetadata) {
        this.songMetadata = songMetadata;
        return this;
    }

    public void setSongMetadata(String songMetadata) {
        this.songMetadata = songMetadata;
    }

    public Integer getYear() {
        return year;
    }

    public Song year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getSongDescription() {
        return songDescription;
    }

    public Song songDescription(String songDescription) {
        this.songDescription = songDescription;
        return this;
    }

    public void setSongDescription(String songDescription) {
        this.songDescription = songDescription;
    }

    public Set<UserExtra> getUsers() {
        return users;
    }

    public Song users(Set<UserExtra> userExtras) {
        this.users = userExtras;
        return this;
    }

    public Song addUser(UserExtra userExtra) {
        this.users.add(userExtra);
        userExtra.getSongs().add(this);
        return this;
    }

    public Song removeUser(UserExtra userExtra) {
        this.users.remove(userExtra);
        userExtra.getSongs().remove(this);
        return this;
    }

    public void setUsers(Set<UserExtra> userExtras) {
        this.users = userExtras;
    }

    public UserExtra getCreatedBy() {
        return createdBy;
    }

    public Song createdBy(UserExtra userExtra) {
        this.createdBy = userExtra;
        return this;
    }

    public void setCreatedBy(UserExtra userExtra) {
        this.createdBy = userExtra;
    }

    public Set<Playlist> getPlaylists() {
        return playlists;
    }

    public Song playlists(Set<Playlist> playlists) {
        this.playlists = playlists;
        return this;
    }

    public Song addPlaylist(Playlist playlist) {
        this.playlists.add(playlist);
        playlist.getSongs().add(this);
        return this;
    }

    public Song removePlaylist(Playlist playlist) {
        this.playlists.remove(playlist);
        playlist.getSongs().remove(this);
        return this;
    }

    public void setPlaylists(Set<Playlist> playlists) {
        this.playlists = playlists;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Song)) {
            return false;
        }
        return id != null && id.equals(((Song) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", songName='" + getSongName() + "'" +
            ", lyrics='" + getLyrics() + "'" +
            ", authors='" + getAuthors() + "'" +
            ", songMetadata='" + getSongMetadata() + "'" +
            ", year=" + getYear() +
            ", songDescription='" + getSongDescription() + "'" +
            "}";
    }
}
