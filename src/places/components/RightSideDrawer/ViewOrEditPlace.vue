<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">
        {{
          isEditPlace
            ? $t("places.editGovernorate")
            : $t("places.viewGovernorate")
        }}
      </h1>

      <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :readonly="!isEditPlace"
                  :label="$t('places.governateNameEnglish')"
                  v-model="placesInput.nameEn"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :readonly="!isEditPlace"
                  :label="$t('places.governateNameArabic')"
                  v-model="placesInput.nameAr"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <v-row v-for="(item, index) in placesInput.areas" :key="index">
                <v-col cols="12" sm="12" md="1" align="right">
                  <p>{{ index + 1 }}</p>
                </v-col>

                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      :readonly="!isEditPlace"
                      :error-messages="errors"
                      :label="$t('places.nameEn')"
                      v-model="item.nameEn"
                      color="secondary"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      :readonly="!isEditPlace"
                      :error-messages="errors"
                      :label="$t('places.nameAr')"
                      color="secondary"
                      v-model="item.nameAr"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col
                  cols="12"
                  sm="12"
                  md="1"
                  align="right"
                  v-if="isEditPlace"
                >
                  <v-btn
                    depressed
                    text
                    color="primary "
                    class="font-weight-bold"
                    x-small
                    @click="deleteVarient(index, item)"
                  >
                    <v-icon left>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              class="mt-n6"
              cols="12"
              sm="12"
              md="12"
              align="right"
              v-if="isEditPlace"
            >
              <v-btn
                depressed
                text
                color="primary "
                class="font-weight-bold text-none"
                x-small
                @click="addVarient"
              >
                <v-icon left small>mdi-plus</v-icon>
                {{ $t("places.add") }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6" v-if="isEditPlace">
              <EditThisProductButton
                :action="editThisProduct"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('places.updateGovernorate')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { updateGovernorate } from "@/places/methods/update_place.js";
import "@/core/methods/validation_rules";
import { addSubAreasToArray } from "@/places/methods/create_sub_areas.js";
import { deleteArea } from "@/places/methods/delete_area.js";
export default {
  data() {
    return {
      placesInput: {
        id: this.currentPlace._id,
        nameEn: this.currentPlace.nameEn,
        nameAr: this.currentPlace.nameAr,
        areas: this.currentPlace.areas,
      },

      errorFromApi: "",

      variables: {
        limit: 0,
        skip: 0,
      },

      btn_loading: false,
      user: null,
      subAreaIndex: 0,
      subAreaId: 0,
    };
  },
  components: {
    EditThisProductButton: () => import("@/places/components/AddButton.vue"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
  },

  props: {
    isEditPlace: {
      type: Boolean,
      default: false,
    },
    currentPlace: {
      required: true,
    },
  },

  methods: {
    editThisProduct() {
      this.btn_loading = true;
      this.$refs.observer.validate();
      updateGovernorate(this.placesInput).then((data) => {
        if (!!data.data) {
          this.$store.commit("SHOW_DRAWER");
          this.btn_loading = false;
        } else {
          if (data.includes("Already exist")) {
            this.errorFromApi = this.$t("inputRules.emailAlreadyExist");
          }
        }
      });
    },
    addVarient() {
      let varient = addSubAreasToArray();
      this.placesInput.areas.push(varient);
    },
    deleteVarient(index, item) {
      if (item._id) {
        (this.subAreaIndex = index),
          (this.subAreaId = item._id),
          this.$refs.form.show();
      } else {
        this.placesInput.areas.splice(index, 1);
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        // console.log(this.subAreaId);
        deleteArea(this.subAreaId).then((data) => {
          // console.log(data);
          this.placesInput.areas.splice(this.subAreaIndex, 1);
        });
      }
    },
  },
};
</script>
