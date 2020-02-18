package com.lurka.voa.domain;
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

    @OneToMany(mappedBy = "song")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserSong> userSongs = new HashSet<>();

    @OneToMany(mappedBy = "song")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ListSong> listSongs = new HashSet<>();

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

    public Set<UserSong> getUserSongs() {
        return userSongs;
    }

    public Song userSongs(Set<UserSong> userSongs) {
        this.userSongs = userSongs;
        return this;
    }

    public Song addUserSong(UserSong userSong) {
        this.userSongs.add(userSong);
        userSong.setSong(this);
        return this;
    }

    public Song removeUserSong(UserSong userSong) {
        this.userSongs.remove(userSong);
        userSong.setSong(null);
        return this;
    }

    public void setUserSongs(Set<UserSong> userSongs) {
        this.userSongs = userSongs;
    }

    public Set<ListSong> getListSongs() {
        return listSongs;
    }

    public Song listSongs(Set<ListSong> listSongs) {
        this.listSongs = listSongs;
        return this;
    }

    public Song addListSong(ListSong listSong) {
        this.listSongs.add(listSong);
        listSong.setSong(this);
        return this;
    }

    public Song removeListSong(ListSong listSong) {
        this.listSongs.remove(listSong);
        listSong.setSong(null);
        return this;
    }

    public void setListSongs(Set<ListSong> listSongs) {
        this.listSongs = listSongs;
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
