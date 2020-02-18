package com.lurka.voa.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserEqualizerSetting.
 */
@Entity
@Table(name = "user_equalizer_setting")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserEqualizerSetting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("userEqualizerSettings")
    private EqualizerSetting equalizerId;

    @ManyToOne
    @JsonIgnoreProperties("userEqualizerSettings")
    private User userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EqualizerSetting getEqualizerId() {
        return equalizerId;
    }

    public UserEqualizerSetting equalizerId(EqualizerSetting equalizerSetting) {
        this.equalizerId = equalizerSetting;
        return this;
    }

    public void setEqualizerId(EqualizerSetting equalizerSetting) {
        this.equalizerId = equalizerSetting;
    }

    public User getUserId() {
        return userId;
    }

    public UserEqualizerSetting userId(User user) {
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
        if (!(o instanceof UserEqualizerSetting)) {
            return false;
        }
        return id != null && id.equals(((UserEqualizerSetting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserEqualizerSetting{" +
            "id=" + getId() +
            "}";
    }
}
