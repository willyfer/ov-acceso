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
          <v-select
            label="Selecciona tu licencia de conducir"
            v-model="form.guarantorDriverLicense"
            :items="listaTiposLicencia"
            item-text="name"
            item-value="id"
            dense
            type="text"
            outlined
            required
            :error-messages="guarantorDriverLicenseErrors"
            @change="$v.form.guarantorDriverLicense.$touch()"
            @blur="$v.form.guarantorDriverLicense.$touch()"
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
      <v-col cols="12" xs="12">
        <v-expansion-panels accordion v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header
              v-show="!form.isAvalist"
              @click="showGuarantor"
              hide-actions
            >
              <v-btn
                rounded
                color="white"
                dark
                small
                class="add-remove-guarantor"
              >
                <v-icon left>mdi-plus-circle</v-icon>
                Adicionar avalista
              </v-btn>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-if="form.isAvalist">
                <div class="guarantor-address-information">
                  <InformationContainer
                    title="Información personal del avalista"
                    align="flex-start"
                  >
                    <v-select
                      :items="listaTiposAvalista"
                      v-model="form.guarantorType"
                      item-text="name"
                      item-value="id"
                      label="Selecciona el tipo de avalista"
                      outlined
                      dense
                      required
                      :error-messages="guarantorTypeErrors"
                      @change="$v.form.guarantorType.$touch()"
                      @blur="$v.form.guarantorType.$touch()"
                    ></v-select>
                    <v-select
                      :items="listaTiposDocumentos"
                      v-model="form.guarantorTypeDocumentType"
                      item-text="tipdoc"
                      item-value="id"
                      label="Tipo de Documento"
                      outlined
                      dense
                      required
                      :error-messages="guarantorTypeDocumentTypeErrors"
                      @change="$v.form.guarantorTypeDocumentType.$touch()"
                      @blur="$v.form.guarantorTypeDocumentType.$touch()"
                    ></v-select>
                    <v-text-field
                      v-model="form.guarantorDocumentNumber"
                      label="Ingresa el documento del avalista"
                      outlined
                      dense
                      required
                      :error-messages="guarantorDocumentNumberErrors"
                      @input="$v.form.guarantorDocumentNumber.$touch()"
                      @blur="$v.form.guarantorDocumentNumber.$touch()"
                    ></v-text-field>
                    <v-menu
                      v-if="hasGuarantorCE"
                      v-model="menuGuarantorBirthDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >

                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="computedDateFormatted3"
                          label="Fecha de Nacimiento"
                          append-icon="mdi-calendar"
                          outlined
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="guarantorBirthDateErrors"
                          @blur="$v.form.guarantorBirthDate.$touch()"
                          @input="$v.form.guarantorBirthDate.$touch()"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.guarantorBirthDate"
                        required
                        @blur="$v.form.guarantorBirthDate.$touch()"
                        @input="setGuarantorBirthDate()"
                      ></v-date-picker>
                    </v-menu>
                  </InformationContainer>
                </div>
                <div class="guarantor-personal-information">
                  <InformationContainer
                    title="Información de domicilio del avalista"
                    align="flex-start"
                  >
                    <v-select
                      :items="departments"
                      v-model="form.guarantorDepartment"
                      item-text="name"
                      item-value="id"
                      label="Departamento"
                      dense
                      outlined
                      required
                      :error-messages="guarantorDepartmentErrors"
                      @change="getProvincesGuarantor"
                      @blur="$v.form.guarantorDepartment.$touch()"
                    ></v-select>
                    <v-select
                      :items="provincesGuarantor"
                      v-model="form.guarantorProvince"
                      item-text="name"
                      item-value="id"
                      label="Provincia"
                      dense
                      outlined
                      required
                      :error-messages="guarantorProvinceErrors"
                      @change="getDistrictsGuarantor"
                      @blur="$v.form.guarantorProvince.$touch()"
                    ></v-select>
                    <v-select
                      :items="districtsGuarantor"
                      v-model="form.guarantorDistrict"
                      item-text="name"
                      item-value="id"
                      label="Distrito"
                      dense
                      outlined
                      required
                      :error-messages="guarantorDistrictErrors"
                      @change="$v.form.guarantorDistrict.$touch()"
                      @blur="$v.form.guarantorDistrict.$touch()"
                    ></v-select>
                    <input
                      id="pac-input-aval"
                      class="controls-pac-input"
                      type="text"
                      placeholder="Ingresa la dirección del avalista"
                      v-model="form.guarantorAddress"
                      required
                      :error-messages="guarantorAddressErrors"
                      @input="$v.form.guarantorAddress.$touch()"
                      @blur="$v.form.guarantorAddress.$touch()"
                    />
                    <div>
                      <GmapMap
                        ref="mapRefAval"
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
                            lat: form.guarantorLatitude ? form.guarantorLatitude : defaultLat,
                            lng: form.guarantorLongitude ? form.guarantorLongitude : defaultLng,
                          }"
                          :draggable="true"
                          @dragend="updateCoordinatesAval"
                        />
                      </GmapMap>
                    </div>
                    <span class="red--text text-caption" v-if="guarantorAddressErrors.length > 0">*Campo requerido</span>
                    <span class="red--text text-caption" v-if="form.guarantorAddress.length > 0 && !form.guarantorLongitude">*Coordenadas no localizadas, localizar la direccion en el mapa</span>
                  </InformationContainer>
                </div>
                <div
                  v-if="isAvalIngresos"
                  class="guarantor-personal-information"
                >
                  <InformationContainer
                    title="Información laboral del avalista"
                    align="flex-start"
                  >
                    <v-text-field
                      v-model="form.guarantorNetRemuneration"
                      label="Ingresa tu remuneración neta"
                      outlined
                      dense
                      required
                      prefix="S/"
                      type="number"
                      :error-messages="guarantorNetRemunerationErrors"
                      @input="$v.form.guarantorNetRemuneration.$touch()"
                      @blur="$v.form.guarantorNetRemuneration.$touch()"
                    ></v-text-field>
                  </InformationContainer>
                </div>
              </div>
              <v-btn
                rounded
                color="white"
                dark
                small
                class="add-remove-guarantor"
                @click="revemoGuarantor"
              >
                <v-icon left>mdi-plus-circle</v-icon>
                Eliminar avalista
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
import {
  required,
  email,
} from 'vuelidate/lib/validators'
import InformationContainer from '@/components/shared/InformationContainer'
import SharedButton from '@/components/shared/SharedButton'
import SnackbarInvalid from '@/components/modals/SnackbarInvalid'
import addressSearchMixin from '@/mixins/addressSearchMixin'
import { dateFormatSend } from '@/utils/helpers'
import {
  MaritalStatus,
  ProductCode,
  TypesDocuments,
  TypeGuarantor,
} from '@/enums/global-enums'
import { defaultValues } from '@/enums/mototaxi-enums'
import { getSchematicRegistrationPersonalData } from '@/validationSchemes/mototaxi'

export default {
  mixins: [addressSearchMixin],
  components: {
    InformationContainer,
    SharedButton,
    SnackbarInvalid,
  },
  props: {
    listaTiposDocumentos: { type: Array, default: () => [] },
    listActividadEconomica: { type: Array, default: () => [] },
    listaSectorEconomico: { type: Array, default: () => [] },
    listaProfesion: { type: Array, default: () => [] },
    listaCargaFamiliar: { type: Array, default: () => [] },
    listaTiposAvalista: { type: Array, default: () => [] },
    listaTiposLicencia: { type: Array, default: () => [] },
    departments: { type: Array, default: () => [] },
    provinces: { type: Array, default: () => [] },
    districts: { type: Array, default: () => [] },
    provincesGuarantor: { type: Array, default: () => [] },
    districtsGuarantor: { type: Array, default: () => [] },
    estadoCivil: { type: String, default: '' },
    codigoProspecto: { type: Number, default: 0 },
    estadoProspecto: { type: Number, default: 0 },
    productCode: { type: Number, default: 0 },
  },
  validations() {
    return getSchematicRegistrationPersonalData(
      this.isMarried,
      this.form.isAvalist,
      this.hasCE,
      this.isAvalIngresos,
      this.hasGuarantorCE,
      this.docLen
    )
  },
  data() {
    return {
      form: {
        documentType: '',
        documentNumber: '',
        familyBurden: '',
        department: '',
        province: '',
        district: '',
        address: '',
        economicSector: '',
        economicActivity: '',
        professionOccupation: '',
        workDate: '',
        birthdate: '',
        latitude: '',
        longitude: '',
        guarantorType: '',
        guarantorTypeDocumentType: '',
        guarantorDocumentNumber: '',
        guarantorDepartment: '',
        guarantorProvince: '',
        guarantorDistrict: '',
        guarantorAddress: '',
        guarantorLatitude: '',
        guarantorLongitude: '',
        guarantorDriverLicense: '',
        guarantorNetRemuneration: '',
        guarantorBirthDate: '',
        isAvalist: false,
      },
      panel: [],
      menuBirthdate: false,
      menuGuarantorBirthDate: false,
      menuWorkDate: false,
      MaritalStatus: MaritalStatus,
      ProductCode: ProductCode,
      TypesDocuments: TypesDocuments,
      TypeGuarantor: TypeGuarantor,
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
    computedDateFormatted3() {
      if (!this.form.guarantorBirthDate) return null
      const [year, month, day] = this.form.guarantorBirthDate.split('-')
      return `${day}-${month}-${year}`
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
      !this.$v.form.documentNumber.numeric &&
        errors.push('El campo solo debe contener números')
      !this.$v.form.documentNumber.minLength &&
        errors.push(`El campo debe contener ${this.docLen} dígitos`)
      !this.$v.form.documentNumber.maxLength &&
        errors.push(`El campo debe contener ${this.docLen} dígitos`)
      !this.$v.form.documentNumber.required && errors.push('Campo requerido')
      return errors
    },
    familyBurdenErrors() {
      const errors = []
      if (!this.$v.form.familyBurden.$dirty) return errors
      !this.$v.form.familyBurden.required && errors.push('Campo requerido')
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
    guarantorBirthDateErrors() {
      const errors = []
      if (!this.$v.form.guarantorBirthDate.$dirty) return errors
      !this.$v.form.guarantorBirthDate.required &&
        errors.push('Campo requerido')
      return errors
    },
    guarantorTypeErrors() {
      const errors = []
      if (!this.$v.form.guarantorType.$dirty) return errors
      !this.$v.form.guarantorType.required && errors.push('Campo requerido')
      return errors
    },
    guarantorTypeDocumentTypeErrors() {
      const errors = []
      if (!this.$v.form.guarantorTypeDocumentType.$dirty) return errors
      !this.$v.form.guarantorTypeDocumentType.required &&
        errors.push('Campo requerido')
      return errors
    },
    guarantorDocumentNumberErrors() {
      const errors = []
      if (!this.$v.form.guarantorDocumentNumber.$dirty) return errors
      !this.$v.form.guarantorDocumentNumber.required &&
        errors.push('Campo requerido')
      return errors
    },
    guarantorDepartmentErrors() {
      const errors = []
      if (!this.$v.form.guarantorDepartment.$dirty) return errors
      !this.$v.form.guarantorDepartment.required &&
        errors.push('Campo requerido')
      return errors
    },
    guarantorProvinceErrors() {
      const errors = []
      if (!this.$v.form.guarantorProvince.$dirty) return errors
      !this.$v.form.guarantorProvince.required && errors.push('Campo requerido')
      return errors
    },
    guarantorDistrictErrors() {
      const errors = []
      if (!this.$v.form.guarantorDistrict.$dirty) return errors
      !this.$v.form.guarantorDistrict.required && errors.push('Campo requerido')
      return errors
    },
    guarantorAddressErrors() {
      const errors = []
      if (!this.$v.form.guarantorAddress.$dirty) return errors
      !this.$v.form.guarantorAddress.required && errors.push('Campo requerido')
      return errors
    },
    guarantorDriverLicenseErrors() {
      const errors = []
      if (!this.$v.form.guarantorDriverLicense.$dirty) return errors
      !this.$v.form.guarantorDriverLicense.required &&
        errors.push('Campo requerido')
      return errors
    },
    guarantorNetRemunerationErrors() {
      const errors = []
      if (!this.$v.form.guarantorNetRemuneration.$dirty) return errors
      !this.$v.form.guarantorNetRemuneration.required &&
        errors.push('Campo requerido')
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
    hasGuarantorCE() {
      return this.form.guarantorTypeDocumentType == this.TypesDocuments.CE
    },
    isAvalIngresos() {
      return this.form.guarantorType == this.TypeGuarantor.AVAL_INGRESOS
    },
    docLen() {
      if (this.form.documentType == 1) {
        return 8
      } else if (this.form.documentType == 2) {
        return 9
      } else {
        return 0
      }
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
    getProvincesGuarantor() {
      this.$v.form.guarantorProvince.$touch()
      this.form.guarantorProvince = ''
      this.form.guarantorDistrict = ''
      this.$emit('get-provinces-guarantor', this.form.guarantorDepartment)
    },
    getDistrictsGuarantor() {
      this.$v.form.guarantorProvince.$touch()
      this.form.guarantorDistrict = ''
      this.$emit('get-districts-guarantor', this.form.guarantorProvince)
    },
    setWorkDate() {
      this.$v.form.workDate.$touch()
      this.menuWorkDate = false
    },
    setBirthdate() {
      this.$v.form.birthdate.$touch()
      this.menuBirthdate = false
    },
    setGuarantorBirthDate() {
      this.$v.form.guarantorBirthDate.$touch()
      this.menuGuarantorBirthDate = false
    },
    registerPersonalData() {
      this.$v.$touch()
      if (!this.$v.$invalid && this.form.latitude) {
        if(!this.form.isAvalist){
          this.submitRegisterPersona()
        }else{
          this.form.guarantorLatitude ? this.submitRegisterPersona() : this.$refs.snackbarInvalid.open()
        }

      } else{
        this.$refs.snackbarInvalid.open()
      }
    },
    submitRegisterPersona(){
      const data = {
          tipoDocumentoConyugue: this.form.documentType
            ? this.form.documentType
            : null,
          documentoConyugue: this.form.documentNumber
            ? this.form.documentNumber
            : null,
          fechaNacimientoConyugue: dateFormatSend(this.form.birthdate),
          cargarFamiliar: this.form.familyBurden,
          ubigeo: this.form.district,
          domicilio: this.form.address,
          sectorEconomico: this.form.economicSector,
          actividadEconomica: this.form.economicActivity,
          profesion: this.form.professionOccupation,
          fechaLaboral: dateFormatSend(this.form.workDate),
          estadoProspecto: this.estadoProspecto,
          codigoProspecto: this.codigoProspecto,
          latitud: this.form.latitude,
          longitud: this.form.longitude,
          licencia: this.form.guarantorDriverLicense,
          isAvalist: this.form.isAvalist,
          tipoAvalista: this.form.guarantorType,
          tipoDocumentoAvalalista: this.form.guarantorTypeDocumentType,
          documentoAvalista: this.form.guarantorDocumentNumber,
          direccionAvalaista: this.form.guarantorAddress,
          ubigeoAvalista: this.form.guarantorDistrict,
          latitudAvalista: this.form.guarantorLatitude,
          longitudAvalista: this.form.guarantorLongitude,
          remuneracionAvalista: this.isAvalIngresos
            ? this.form.guarantorNetRemuneration
            : '',
          fechaNacimientoAvalista: this.hasGuarantorCE
            //? this.form.guarantorBirthDate
            ? this.computedDateFormatted3
            : '',
        }
        this.$emit('registration-personal-data', data)
    },
    revemoGuarantor() {
      this.panel = []
      this.form.isAvalist = false
      this.clearGuarantor()
    },
    showGuarantor() {
      /* setTimeout(() => {       */
      this.form.isAvalist = true
      this.clearGuarantor()
      setTimeout(() => {
        this.addressSearch(
          'mapRefAval',
          'pac-input-aval',
          'guarantorLatitude',
          'guarantorLongitude',
          'guarantorAddress'
        )
      })
      /* }, 100); */
    },
    clearGuarantor() {
      this.form.guarantorType = ''
      this.form.guarantorTypeDocumentType = ''
      this.form.guarantorDocumentNumber = ''
      this.form.guarantorDepartment = ''
      this.form.guarantorProvince = ''
      this.form.guarantorDistrict = ''
      this.form.guarantorAddress = ''
      this.form.guarantorLatitude = ''
      this.form.guarantorLongitude = ''
      this.form.guarantorNetRemuneration = ''
    },
    handleChangeEconomicSector(idSectorEconomico) {
      this.$v.form.economicSector.$touch()
      this.$emit('handle-change-economic-sector', idSectorEconomico)
    },
    setDefaultValues() {
      this.form.economicSector = defaultValues.ECONOMIC_SECTOR
      this.form.economicActivity = defaultValues.ECONOMIC_ACTIVITY
      this.form.professionOccupation = defaultValues.PROFESSION_AND_OCCUPATION
    },
    updateCoordinates(location) {
      this.form.latitude = location.latLng.lat()
      this.form.longitude = location.latLng.lng()
    },
    updateCoordinatesAval(location) {
      this.form.guarantorLatitude = location.latLng.lat()
      this.form.guarantorLongitude = location.latLng.lng()
    },
  },
  mounted() {
    /* const { id } = this.listaTiposDocumentos.find(i => i.id == TypesDocuments.DNI );
    this.form.documentType = id ? id : '';
    this.form.guarantorTypeDocumentType = id ? id : ''; */
    this.addressSearch(
      'mapRef',
      'pac-input',
      'latitude',
      'longitude',
      'address'
    )
    this.setDefaultValues()
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
  .v-expansion-panels .v-expansion-panel {
    background: silver !important;
    border-radius: 20px !important;
  }
  .v-expansion-panel-header {
    width: 236px;
    float: right;
    padding-right: 12px;
  }
  .v-expansion-panel-content {
    width: 100%;
  }
  .v-expansion-panel-content__wrap {
    padding-left: 0px;
    padding-right: 0px;
  }
  .guarantor-address-information {
    margin: 5px;
  }
  .guarantor-personal-information {
    margin: 20px 5px 20px 5px;
  }
  .add-remove-guarantor {
    color: blue;
    float: right;
    margin-right: 20px;
  }
}
</style>
