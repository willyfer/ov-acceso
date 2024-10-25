<template>
  <div class="registration-personal-data-motorcycle-form">
    <v-row>
      <v-col cols="12" xs="12">
        <InformationContainer title="Información personal" align="flex-start">
          <v-select
            v-if="isMarried"
            v-model="form.documentType"
            :items="listaTiposDocumentos"
            item-text="tipdoc"
            item-value="id"
            label="Tipo de Documento de la conyugue"
            outlined
            dense
            required
            :error-messages="documentTypeErrors"
            @change="$v.form.documentType.$touch()"
            @blur="$v.form.documentType.$touch()"
          ></v-select>
          <v-text-field
            v-if="isMarried"
            v-model="form.documentNumber"
            label="Número de Documento de la conyugue"
            outlined
            dense
            required
            :error-messages="documentNumberErrors"
            @input="$v.form.documentNumber.$touch()"
            @blur="$v.form.documentNumber.$touch()"
          ></v-text-field>
          <v-menu
            v-if="hasCE"
            v-model="menuBirthdate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted2"
                label="Fecha de Nacimiento de la conyugue"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
                :error-messages="birthdateErrors"
                @blur="$v.form.birthdate.$touch()"
                @input="$v.form.birthdate.$touch()"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.birthdate"
              required
              @blur="$v.form.birthdate.$touch()"
              @input="setBirthdate()"
            ></v-date-picker>
          </v-menu>
          <v-select
            v-model="form.familyBurden"
            :items="listaCargaFamiliar"
            item-text="carga"
            item-value="id"
            label="Ingresa tu carga familiar"
            outlined
            dense
            required
            :error-messages="familyBurdenErrors"
            @change="$v.form.familyBurden.$touch()"
            @blur="$v.form.familyBurden.$touch()"
          ></v-select>
        </InformationContainer>
      </v-col>
      <v-col cols="12" xs="12">
        <InformationContainer title="Datos del domicilio" align="flex-start">
          <v-select
            v-model="form.typeHousing"
            :items="listaTiposResidencias"
            item-text="name"
            item-value="id"
            label="Tipo Vivienda"
            outlined
            dense
            required
            :error-messages="typeHousingErrors"
            @change="$v.form.typeHousing.$touch()"
            @blur="$v.form.typeHousing.$touch()"
          ></v-select>
          <v-select
            :items="departments"
            v-model="form.department"
            item-text="name"
            item-value="id"
            label="Departamento"
            dense
            outlined
            required
            @change="getProvinces"
            :error-messages="departmentErrors"
            @blur="$v.form.department.$touch()"
          ></v-select>
          <v-select
            :items="provinces"
            v-model="form.province"
            item-text="name"
            item-value="id"
            label="Provincia"
            dense
            outlined
            required
            @change="getDistricts"
            :error-messages="provinceErrors"
            @blur="$v.form.province.$touch()"
          ></v-select>
          <v-select
            v-model="form.district"
            :items="districts"
            item-text="name"
            item-value="id"
            label="Distrito"
            dense
            outlined
            required
            :error-messages="districtErrors"
            @change="$v.form.district.$touch()"
            @blur="$v.form.district.$touch()"
          ></v-select>
          <input
            id="pac-input"
            class="controls-pac-input"
            type="text"
            placeholder="Dirección"
            v-model="form.address"
            required
            :error-messages="addressErrors"
            @input="$v.form.address.$touch()"
            @blur="$v.form.address.$touch()"
          />
          <div>
            <GmapMap
              ref="mapRef"
              :center="{ lat: defaultLat, lng: defaultLng }"
              :zoom="7"
              map-type-id="terrain"
              style="height: 450px"
              :options="{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }"
            >
              <GmapMarker
                :position="{
                  lat: form.latitude ? form.latitude : defaultLat,
                  lng: form.longitude ? form.longitude : defaultLng,
                }"
                :draggable="true"
                @dragend="updateCoordinates"
              />
            </GmapMap>
          </div>
          <span class="red--text text-caption" v-if="addressErrors.length > 0">*Campo requerido</span>
          <span class="red--text text-caption" v-if="form.address.length > 0 && !form.latitude">*Coordenadas no localizadas, localizar la direccion en el mapa</span>
        </InformationContainer>
      </v-col>
      <v-col cols="12" xs="12">
        <InformationContainer title="Información laboral" align="flex-start">
          <v-select
            label="Selecciona sector económico"
            v-model="form.economicSector"
            :items="listaSectorEconomico"
            item-text="tipo"
            item-value="sector"
            dense
            outlined
            required
            :error-messages="economicSectorErrors"
            @change="handleChangeEconomicSector"
            @blur="$v.form.economicSector.$touch()"
          ></v-select>
          <v-select
            label="Selecciona tipo de uso del moto"
            v-model="form.useOfMoto"
            :items="listaTipoUsoMoto"
            item-text="tipo"
            item-value="id"
            dense
            outlined
            required
            :error-messages="useOfMotoErrors"
            @change="$v.form.useOfMoto.$touch()"
            @blur="$v.form.useOfMoto.$touch()"
          ></v-select>
          <v-select
            label="Selecciona actividad económica"
            v-model="form.economicActivity"
            :items="listActividadEconomica"
            item-text="tipo"
            item-value="id"
            dense
            outlined
            required
            :error-messages="economicActivityErrors"
            @change="$v.form.economicActivity.$touch()"
            @blur="$v.form.economicActivity.$touch()"
          ></v-select>
          <v-select
            label="Selecciona tu profesión y ocupación"
            v-model="form.professionOccupation"
            :items="listaProfesion"
            item-text="name"
            item-value="id"
            dense
            outlined
            required
            :error-messages="professionOccupationErrors"
            @change="$v.form.professionOccupation.$touch()"
            @blur="$v.form.professionOccupation.$touch()"
          ></v-select>
          <v-menu
            v-model="menuWorkDate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Fecha de Ingreso a trabajar"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
                :error-messages="workDateErrors"
                @blur="$v.form.workDate.$touch()"
                @input="$v.form.workDate.$touch()"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.workDate"
              required
              @blur="$v.form.workDate.$touch()"
              @input="setWorkDate()"
            ></v-date-picker>
          </v-menu>
        </InformationContainer>
      </v-col>
      <div class="button-registration-personal-data">
        <SharedButton
          text="Confirmar datos"
          :buttonOrange="true"
          :totalWidth="60"
          @click="registerPersonalData"
        />
      </div>
    </v-row>
    <SnackbarInvalid ref="snackbarInvalid" />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import InformationContainer from '@/components/shared/InformationContainer'
import SharedButton from '@/components/shared/SharedButton'
import SnackbarInvalid from '@/components/modals/SnackbarInvalid'
import addressSearchMixin from '@/mixins/addressSearchMixin'
import { dateFormatSend } from '@/utils/helpers'
import {
  MaritalStatus,
  ProductCode,
  TypesDocuments,
} from '@/enums/global-enums'

export default {
  mixins: [addressSearchMixin],
  components: {
    InformationContainer,
    SharedButton,
    SnackbarInvalid,
  },
  props: {
    listaTiposDocumentos: { type: Array, default: () => [] },
    listaTiposResidencias: { type: Array, default: () => [] },
    listaActividadEconomica: { type: Array, default: () => [] },
    listaSectorEconomico: { type: Array, default: () => [] },
    listaTipoUsoMoto: { type: Array, default: () => [] },
    listaProfesion: { type: Array, default: () => [] },
    listaCargaFamiliar: { type: Array, default: () => [] },
    departments: { type: Array, default: () => [] },
    provinces: { type: Array, default: () => [] },
    districts: { type: Array, default: () => [] },
    estadoCivil: { type: String, default: '' },
    codigoProspecto: { type: Number, default: 0 },
    estadoProspecto: { type: Number, default: 0 },
    productCode: { type: Number, default: 0 },
    netRemuneration: { type: Number, default: 0 },
  },
  validations() {
    if (!this.isMarried) {
      console.log('xxxxxxxxxxsolteroxxxxxxxxxxxxxxxx')
      return {
        form: {
          familyBurden: {
            required,
          },
          typeHousing: {
            required,
          },
          department: {
            required,
          },
          province: {
            required,
          },
          district: {
            required,
          },
          address: {
            required,
          },
          economicSector: {
            required,
          },
          useOfMoto: {
            required,
          },
          economicActivity: {
            required,
          },
          professionOccupation: {
            required,
          },
          workDate: {
            required,
          },
        },
      }
    } else if (this.isMarried && !this.hasCE) {
      console.log('xxxxxxxxxx casado con DNI xxxxxxxxxxxxxxxx')
      return {
        form: {
          documentType: {
            required,
          },
          documentNumber: {
            required,
          },
          familyBurden: {
            required,
          },
          typeHousing: {
            required,
          },
          department: {
            required,
          },
          province: {
            required,
          },
          district: {
            required,
          },
          address: {
            required,
          },
          economicSector: {
            required,
          },
          useOfMoto: {
            required,
          },
          economicActivity: {
            required,
          },
          professionOccupation: {
            required,
          },
          workDate: {
            required,
          },
        },
      }
    } else if (this.isMarried && this.hasCE) {
      console.log('xxxxxxxxxx casado con CE xxxxxxxxxxxxxxxx')
      return {
        form: {
          documentType: {
            required,
          },
          documentNumber: {
            required,
          },
          birthdate: {
            required,
          },
          familyBurden: {
            required,
          },
          typeHousing: {
            required,
          },
          department: {
            required,
          },
          province: {
            required,
          },
          district: {
            required,
          },
          address: {
            required,
          },
          economicSector: {
            required,
          },
          useOfMoto: {
            required,
          },
          economicActivity: {
            required,
          },
          professionOccupation: {
            required,
          },
          workDate: {
            required,
          },
        },
      }
    }
  },
  data() {
    return {
      /*listaTipoVehivulo: [
        { id: 1, label: 'Particulares'},
        { id: 2, label: 'Mensajería'},
        { id: 3, label: 'Delivery'}
      ],*/
      form: {
        documentType: '',
        documentNumber: '',
        birthdate: '',
        familyBurden: '',
        typeHousing: '',
        department: '',
        province: '',
        district: '',
        address: '',
        economicSector: '',
        useOfMoto: '',
        economicActivity: '',
        professionOccupation: '',
        workDate: '',
        latitude: '',
        longitude: '',
      },
      menuBirthdate: false,
      menuWorkDate: false,
      MaritalStatus: MaritalStatus,
      ProductCode: ProductCode,
      TypesDocuments: TypesDocuments,
      listActividadEconomica: [],
      defaultLat: -12.0453,
      defaultLng: -77.0311,
    }
  },
  computed: {
    computedDateFormatted() {
      if (!this.form.workDate) return null
      const [year, month, day] = this.form.workDate.split('-')
      return `${day}/${month}/${year}`
    },
    computedDateFormatted2() {
      if (!this.form.birthdate) return null
      const [year, month, day] = this.form.birthdate.split('-')
      return `${day}/${month}/${year}`
    },
    documentTypeErrors() {
      const errors = []
      if (!this.$v.form.documentType.$dirty) return errors
      !this.$v.form.documentType.required && errors.push('Campo requerido')
      return errors
    },
    documentNumberErrors() {
      const errors = []
      if (!this.$v.form.documentNumber.$dirty) return errors
      !this.$v.form.documentNumber.required && errors.push('Campo requerido')
      return errors
    },
    familyBurdenErrors() {
      const errors = []
      if (!this.$v.form.familyBurden.$dirty) return errors
      !this.$v.form.familyBurden.required && errors.push('Campo requerido')
      return errors
    },
    typeHousingErrors() {
      const errors = []
      if (!this.$v.form.typeHousing.$dirty) return errors
      !this.$v.form.typeHousing.required && errors.push('Campo requerido')
      return errors
    },
    departmentErrors() {
      const errors = []
      if (!this.$v.form.department.$dirty) return errors
      !this.$v.form.department.required && errors.push('Campo requerido')
      return errors
    },
    provinceErrors() {
      const errors = []
      if (!this.$v.form.province.$dirty) return errors
      !this.$v.form.province.required && errors.push('Campo requerido')
      return errors
    },
    districtErrors() {
      const errors = []
      if (!this.$v.form.district.$dirty) return errors
      !this.$v.form.district.required && errors.push('Campo requerido')
      return errors
    },
    addressErrors() {
      const errors = []
      if (!this.$v.form.address.$dirty) return errors
      !this.$v.form.address.required && errors.push('Campo requerido')
      return errors
    },
    economicSectorErrors() {
      const errors = []
      if (!this.$v.form.economicSector.$dirty) return errors
      !this.$v.form.economicSector.required && errors.push('Campo requerido')
      return errors
    },
    useOfMotoErrors() {
      const errors = []
      if (!this.$v.form.useOfMoto.$dirty) return errors
      !this.$v.form.useOfMoto.required && errors.push('Campo requerido')
      return errors
    },
    economicActivityErrors() {
      const errors = []
      if (!this.$v.form.economicActivity.$dirty) return errors
      !this.$v.form.economicActivity.required && errors.push('Campo requerido')
      return errors
    },
    professionOccupationErrors() {
      const errors = []
      if (!this.$v.form.professionOccupation.$dirty) return errors
      !this.$v.form.professionOccupation.required &&
        errors.push('Campo requerido')
      return errors
    },
    workDateErrors() {
      const errors = []
      if (!this.$v.form.workDate.$dirty) return errors
      !this.$v.form.workDate.required && errors.push('Campo requerido')
      return errors
    },
    birthdateErrors() {
      const errors = []
      if (!this.$v.form.birthdate.$dirty) return errors
      !this.$v.form.birthdate.required && errors.push('Campo requerido')
      return errors
    },
    ////////////////////////
    isMarried() {
      return (
        this.MaritalStatus.CASADO == this.estadoCivil ||
        this.MaritalStatus.CONVIVIENTE == this.estadoCivil
      )
    },
    hasCE() {
      return this.form.documentType == this.TypesDocuments.CE
    },
  },
  methods: {
    getProvinces() {
      this.$v.form.department.$touch()
      this.form.province = ''
      this.form.district = ''
      this.$emit('get-provinces', this.form.department)
    },
    getDistricts() {
      this.$v.form.province.$touch()
      this.form.district = ''
      this.$emit('get-districts', this.form.province)
    },
    setWorkDate() {
      this.$v.form.workDate.$touch()
      this.menuWorkDate = false
    },
    setBirthdate() {
      this.$v.form.birthdate.$touch()
      this.menuBirthdate = false
    },
    registerPersonalData() {
      this.$v.$touch()
      if (!this.$v.$invalid && this.form.latitude) {
        const data = {
          tipoDocumentoConyugue: this.form.documentType
            ? this.form.documentType
            : null,
          documentoConyugue: this.form.documentNumber
            ? this.form.documentNumber
            : null,
          fechaNacimientoConyugue: dateFormatSend(this.form.birthdate),
          cargarFamiliar: this.form.familyBurden,
          tipoVivienda: this.form.typeHousing,
          ubigeo: this.form.district,
          domicilio: this.form.address,
          sectorEconomico: this.form.economicSector,
          actividadEconomica: this.form.economicActivity,
          usoTipoMoto: this.form.useOfMoto,
          profesion: this.form.professionOccupation,
          fechaLaboral: dateFormatSend(this.form.workDate),
          estadoProspecto: this.estadoProspecto,
          codigoProspecto: this.codigoProspecto,
          latitud: this.form.latitude,
          longitud: this.form.longitude,
          ti_solpro: this.productCode,
          remuneracion: this.netRemuneration,
          ingresoNeto: this.netRemuneration,
        }
        this.$emit('registration-personal-data', data)
      } else this.$refs.snackbarInvalid.open()
    },
    handleChangeEconomicSector(idSectorEconomico) {
      this.$v.form.economicSector.$touch()
      this.listActividadEconomica = this.listaActividadEconomica.filter(
        (item) => item.sector == idSectorEconomico
      )
    },
    updateCoordinates(location) {
      this.form.latitude = location.latLng.lat()
      this.form.longitude = location.latLng.lng()
    },
  },
  mounted() {
    /* const { id } = this.listaTiposDocumentos.find(i => i.id == TypesDocuments.DNI );
    this.form.documentType = id ? id : ''; */
    this.addressSearch(
      'mapRef',
      'pac-input',
      'latitude',
      'longitude',
      'address'
    )
  },
}
</script>

<style lang='scss'>
.registration-personal-data-motorcycle-form {
  .button-registration-personal-data {
    width: 100%;
    text-align: center;
    margin: 50px 0;
  }
  .v-text-field.v-text-field--enclosed.error--text .v-text-field__details {
    margin-top: 0px !important;
    margin-bottom: 14px !important;
  }
  .controls-pac-input {
    background: white;
    height: 40px;
    width: 100%;
    border: 1px silver solid;
    border-radius: 10px;
    padding-left: 5px;
    font-size: 14px;
    left: 0 !important;
  }
  .vue-map {
    border-radius: 10px;
  }
}
</style>
