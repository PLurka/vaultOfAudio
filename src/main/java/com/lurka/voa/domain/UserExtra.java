package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserExtra.
 */
@Entity
@Table(name = "user_extra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "createdBy")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EqualizerSetting> createdEqualizerSettings = new HashSet<>();

    @OneToMany(mappedBy = "createdBy")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Song> createdSongs = new HashSet<>();

    @OneToMany(mappedBy = "createdBy")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Playlist> createdPlaylists = new HashSet<>();

    @OneToMany(mappedBy = "createdBy")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Crowd> createdCrowds = new HashSet<>();

    @ManyToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<EqualizerSetting> equalizerSettings = new HashSet<>();

    @ManyToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Song> songs = new HashSet<>();

    @ManyToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Playlist> playlists = new HashSet<>();

    @ManyToMany(mappedBy = "users")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Crowd> crowds = new HashSet<>();

    @ManyToMany(mappedBy = "accepteds")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Crowd> acceptedCrowds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public UserExtra user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<EqualizerSetting> getCreatedEqualizerSettings() {
        return createdEqualizerSettings;
    }

    public UserExtra createdEqualizerSettings(Set<EqualizerSetting> equalizerSettings) {
        this.createdEqualizerSettings = equalizerSettings;
        return this;
    }

    public UserExtra addCreatedEqualizerSetting(EqualizerSetting equalizerSetting) {
        this.createdEqualizerSettings.add(equalizerSetting);
        equalizerSetting.setCreatedBy(this);
        return this;
    }

    public UserExtra removeCreatedEqualizerSetting(EqualizerSetting equalizerSetting) {
        this.createdEqualizerSettings.remove(equalizerSetting);
        equalizerSetting.setCreatedBy(null);
        return this;
    }

    public void setCreatedEqualizerSettings(Set<EqualizerSetting> equalizerSettings) {
        this.createdEqualizerSettings = equalizerSettings;
    }

    public Set<Song> getCreatedSongs() {
        return createdSongs;
    }

    public UserExtra createdSongs(Set<Song> songs) {
        this.createdSongs = songs;
        return this;
    }

    public UserExtra addCreatedSong(Song song) {
        this.createdSongs.add(song);
        song.setCreatedBy(this);
        return this;
    }

    public UserExtra removeCreatedSong(Song song) {
        this.createdSongs.remove(song);
        song.setCreatedBy(null);
        return this;
    }

    public void setCreatedSongs(Set<Song> songs) {
        this.createdSongs = songs;
    }

    public Set<Playlist> getCreatedPlaylists() {
        return createdPlaylists;
    }

    public UserExtra createdPlaylists(Set<Playlist> playlists) {
        this.createdPlaylists = playlists;
        return this;
    }

    public UserExtra addCreatedPlaylist(Playlist playlist) {
        this.createdPlaylists.add(playlist);
        playlist.setCreatedBy(this);
        return this;
    }

    public UserExtra removeCreatedPlaylist(Playlist playlist) {
        this.createdPlaylists.remove(playlist);
        playlist.setCreatedBy(null);
        return this;
    }

    public void setCreatedPlaylists(Set<Playlist> playlists) {
        this.createdPlaylists = playlists;
    }

    public Set<Crowd> getCreatedCrowds() {
        return createdCrowds;
    }

    public UserExtra createdCrowds(Set<Crowd> crowds) {
        this.createdCrowds = crowds;
        return this;
    }

    public UserExtra addCreatedCrowd(Crowd crowd) {
        this.createdCrowds.add(crowd);
        crowd.setCreatedBy(this);
        return this;
    }

    public UserExtra removeCreatedCrowd(Crowd crowd) {
        this.createdCrowds.remove(crowd);
        crowd.setCreatedBy(null);
        return this;
    }

    public void setCreatedCrowds(Set<Crowd> crowds) {
        this.createdCrowds = crowds;
    }

    public Set<EqualizerSetting> getEqualizerSettings() {
        return equalizerSettings;
    }

    public UserExtra equalizerSettings(Set<EqualizerSetting> equalizerSettings) {
        this.equalizerSettings = equalizerSettings;
        return this;
    }

    public UserExtra addEqualizerSetting(EqualizerSetting equalizerSetting) {
        this.equalizerSettings.add(equalizerSetting);
        equalizerSetting.getUsers().add(this);
        return this;
    }

    public UserExtra removeEqualizerSetting(EqualizerSetting equalizerSetting) {
        this.equalizerSettings.remove(equalizerSetting);
        equalizerSetting.getUsers().remove(this);
        return this;
    }

    public void setEqualizerSettings(Set<EqualizerSetting> equalizerSettings) {
        this.equalizerSettings = equalizerSettings;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public UserExtra songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public UserExtra addSong(Song song) {
        this.songs.add(song);
        song.getUsers().add(this);
        return this;
    }

    public UserExtra removeSong(Song song) {
        this.songs.remove(song);
        song.getUsers().remove(this);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public Set<Playlist> getPlaylists() {
        return playlists;
    }

    public UserExtra playlists(Set<Playlist> playlists) {
        this.playlists = playlists;
        return this;
    }

    public UserExtra addPlaylist(Playlist playlist) {
        this.playlists.add(playlist);
        playlist.getUsers().add(this);
        return this;
    }

    public UserExtra removePlaylist(Playlist playlist) {
        this.playlists.remove(playlist);
        playlist.getUsers().remove(this);
        return this;
    }

    public void setPlaylists(Set<Playlist> playlists) {
        this.playlists = playlists;
    }

    public Set<Crowd> getCrowds() {
        return crowds;
    }

    public UserExtra crowds(Set<Crowd> crowds) {
        this.crowds = crowds;
        return this;
    }

    public UserExtra addCrowd(Crowd crowd) {
        this.crowds.add(crowd);
        crowd.getUsers().add(this);
        return this;
    }

    public UserExtra removeCrowd(Crowd crowd) {
        this.crowds.remove(crowd);
        crowd.getUsers().remove(this);
        return this;
    }

    public void setCrowds(Set<Crowd> crowds) {
        this.crowds = crowds;
    }

    public Set<Crowd> getAcceptedCrowds() {
        return acceptedCrowds;
    }

    public UserExtra acceptedCrowds(Set<Crowd> crowds) {
        this.acceptedCrowds = crowds;
        return this;
    }

    public UserExtra addAcceptedCrowd(Crowd crowd) {
        this.acceptedCrowds.add(crowd);
        crowd.getAccepteds().add(this);
        return this;
    }

    public UserExtra removeAcceptedCrowd(Crowd crowd) {
        this.acceptedCrowds.remove(crowd);
        crowd.getAccepteds().remove(this);
        return this;
    }

    public void setAcceptedCrowds(Set<Crowd> crowds) {
        this.acceptedCrowds = crowds;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtra)) {
            return false;
        }
        return id != null && id.equals(((UserExtra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            "}";
    }
}
