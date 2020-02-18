package com.lurka.voa.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A EqualizerSetting.
 */
@Entity
@Table(name = "equalizer_setting")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EqualizerSetting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(name = "equalizer_name", length = 50, nullable = false)
    private String equalizerName;

    @NotNull
    @Column(name = "first", nullable = false)
    private Integer first;

    @NotNull
    @Column(name = "second", nullable = false)
    private Integer second;

    @NotNull
    @Column(name = "third", nullable = false)
    private Integer third;

    @NotNull
    @Column(name = "fourth", nullable = false)
    private Integer fourth;

    @NotNull
    @Column(name = "fifth", nullable = false)
    private Integer fifth;

    @NotNull
    @Column(name = "sixth", nullable = false)
    private Integer sixth;

    @NotNull
    @Column(name = "seventh", nullable = false)
    private Integer seventh;

    @NotNull
    @Column(name = "eight", nullable = false)
    private Integer eight;

    @NotNull
    @Column(name = "ninth", nullable = false)
    private Integer ninth;

    @NotNull
    @Column(name = "tenth", nullable = false)
    private Integer tenth;

    @OneToMany(mappedBy = "equalizerSetting")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserEqualizerSetting> userEqualizerSettings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEqualizerName() {
        return equalizerName;
    }

    public EqualizerSetting equalizerName(String equalizerName) {
        this.equalizerName = equalizerName;
        return this;
    }

    public void setEqualizerName(String equalizerName) {
        this.equalizerName = equalizerName;
    }

    public Integer getFirst() {
        return first;
    }

    public EqualizerSetting first(Integer first) {
        this.first = first;
        return this;
    }

    public void setFirst(Integer first) {
        this.first = first;
    }

    public Integer getSecond() {
        return second;
    }

    public EqualizerSetting second(Integer second) {
        this.second = second;
        return this;
    }

    public void setSecond(Integer second) {
        this.second = second;
    }

    public Integer getThird() {
        return third;
    }

    public EqualizerSetting third(Integer third) {
        this.third = third;
        return this;
    }

    public void setThird(Integer third) {
        this.third = third;
    }

    public Integer getFourth() {
        return fourth;
    }

    public EqualizerSetting fourth(Integer fourth) {
        this.fourth = fourth;
        return this;
    }

    public void setFourth(Integer fourth) {
        this.fourth = fourth;
    }

    public Integer getFifth() {
        return fifth;
    }

    public EqualizerSetting fifth(Integer fifth) {
        this.fifth = fifth;
        return this;
    }

    public void setFifth(Integer fifth) {
        this.fifth = fifth;
    }

    public Integer getSixth() {
        return sixth;
    }

    public EqualizerSetting sixth(Integer sixth) {
        this.sixth = sixth;
        return this;
    }

    public void setSixth(Integer sixth) {
        this.sixth = sixth;
    }

    public Integer getSeventh() {
        return seventh;
    }

    public EqualizerSetting seventh(Integer seventh) {
        this.seventh = seventh;
        return this;
    }

    public void setSeventh(Integer seventh) {
        this.seventh = seventh;
    }

    public Integer getEight() {
        return eight;
    }

    public EqualizerSetting eight(Integer eight) {
        this.eight = eight;
        return this;
    }

    public void setEight(Integer eight) {
        this.eight = eight;
    }

    public Integer getNinth() {
        return ninth;
    }

    public EqualizerSetting ninth(Integer ninth) {
        this.ninth = ninth;
        return this;
    }

    public void setNinth(Integer ninth) {
        this.ninth = ninth;
    }

    public Integer getTenth() {
        return tenth;
    }

    public EqualizerSetting tenth(Integer tenth) {
        this.tenth = tenth;
        return this;
    }

    public void setTenth(Integer tenth) {
        this.tenth = tenth;
    }

    public Set<UserEqualizerSetting> getUserEqualizerSettings() {
        return userEqualizerSettings;
    }

    public EqualizerSetting userEqualizerSettings(Set<UserEqualizerSetting> userEqualizerSettings) {
        this.userEqualizerSettings = userEqualizerSettings;
        return this;
    }

    public EqualizerSetting addUserEqualizerSetting(UserEqualizerSetting userEqualizerSetting) {
        this.userEqualizerSettings.add(userEqualizerSetting);
        userEqualizerSetting.setEqualizerSetting(this);
        return this;
    }

    public EqualizerSetting removeUserEqualizerSetting(UserEqualizerSetting userEqualizerSetting) {
        this.userEqualizerSettings.remove(userEqualizerSetting);
        userEqualizerSetting.setEqualizerSetting(null);
        return this;
    }

    public void setUserEqualizerSettings(Set<UserEqualizerSetting> userEqualizerSettings) {
        this.userEqualizerSettings = userEqualizerSettings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EqualizerSetting)) {
            return false;
        }
        return id != null && id.equals(((EqualizerSetting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EqualizerSetting{" +
            "id=" + getId() +
            ", equalizerName='" + getEqualizerName() + "'" +
            ", first=" + getFirst() +
            ", second=" + getSecond() +
            ", third=" + getThird() +
            ", fourth=" + getFourth() +
            ", fifth=" + getFifth() +
            ", sixth=" + getSixth() +
            ", seventh=" + getSeventh() +
            ", eight=" + getEight() +
            ", ninth=" + getNinth() +
            ", tenth=" + getTenth() +
            "}";
    }
}
