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
                <v-autocomplete
                  v-model="placesInput.from"
                  outlined
                  dense
                  :readonly="!isEditPlace"
                  :error-messages="errors"
                  color="secondary"
                  :items="allPlaces"
                  :item-text="$store.getters.rtl ? 'nameAr' : 'nameEn'"
                  item-value="_id"
                  :label="$t('pricing.fromGovernate')"
                >
                  <template v-slot:item="{ item }">
                    <p class="primary--text mt-3">
                      {{ $store.getters.rtl ? item.nameAr : item.nameEn }}
                    </p>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  v-model="placesInput.to"
                  outlined
                  :readonly="!isEditPlace"
                  dense
                  :error-messages="errors"
                  color="secondary"
                  :items="allPlaces"
                  :item-text="$store.getters.rtl ? 'nameAr' : 'nameEn'"
                  item-value="_id"
                  :label="$t('pricing.toGovernate')"
                >
                  <template v-slot:item="{ item }">
                    <p class="primary--text mt-3">
                      {{ $store.getters.rtl ? item.nameAr : item.nameEn }}
                    </p>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  :error-messages="errors"
                  dense
                  type="number"
                  :readonly="!isEditPlace"
                  :min="0"
                  :label="$t('pricing.price')"
                  color="secondary"
                  v-model="placesInput.price"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :error-messages="errors"
                  :label="$t('pricing.commission')"
                  color="secondary"
                  type="number"
                  :readonly="!isEditPlace"
                  :min="0"
                  v-model="placesInput.commission"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" v-if="isEditPlace">
              <EditThisProductButton
                :action="editThisProduct"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('pricing.editThisRule')"
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
import { updateGovernorateTransferPrice } from "@/pricing/methods/update_govt_to_govt.js";
import "@/core/methods/validation_rules";
import { addSubAreasToArray } from "@/places/methods/create_sub_areas.js";
import { deleteArea } from "@/places/methods/delete_area.js";
export default {
  data() {
    return {
      placesInput: {
        id: this.currentPlace._id,
        from: this.currentPlace.from._id,
        to: this.currentPlace.to._id,
        price: this.currentPlace.price,
        commission: this.currentPlace.commission,
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
      allPlaces: [],
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

  apollo: {
    governorates() {
      return {
        query: require("@/places/api/queries/places_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log("places", data.governorates);

          this.allPlaces = data.governorates;
        },
      };
    },
  },

  methods: {
    editThisProduct() {
      this.btn_loading = true;
      this.$refs.observer.validate();
      updateGovernorateTransferPrice(this.placesInput).then((data) => {
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
          this.placesInput.areas.splice(this.subAreaIndex, 1);
        });
      }
    },
  },
};
</script>
