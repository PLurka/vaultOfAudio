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

    @Column(name = "created_by")
    private Boolean createdBy;

    @ManyToOne
    @JsonIgnoreProperties("userEqualizerSettings")
    private EqualizerSetting equalizerSetting;

    @ManyToOne
    @JsonIgnoreProperties("userEqualizerSettings")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isCreatedBy() {
        return createdBy;
    }

    public UserEqualizerSetting createdBy(Boolean createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(Boolean createdBy) {
        this.createdBy = createdBy;
    }

    public EqualizerSetting getEqualizerSetting() {
        return equalizerSetting;
    }

    public UserEqualizerSetting equalizerSetting(EqualizerSetting equalizerSetting) {
        this.equalizerSetting = equalizerSetting;
        return this;
    }

    public void setEqualizerSetting(EqualizerSetting equalizerSetting) {
        this.equalizerSetting = equalizerSetting;
    }

    public User getUser() {
        return user;
    }

    public UserEqualizerSetting user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
            ", createdBy='" + isCreatedBy() + "'" +
            "}";
    }
}
