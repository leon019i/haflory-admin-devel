<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{$t("places.addNewGovernorate")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('places.governateNameEnglish')"
                  v-model="placesInput.nameEn"
                  color="secondary"
                  :error-messages=" errorFromApi ? errorFromApi : errors"
                  @click="errorFromApi = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('places.governateNameArabic')"
                  v-model="placesInput.nameAr"
                  color="secondary"
                  :error-messages=" errorFromApiAr ? errorFromApiAr : errors"
                  @click="errorFromApiAr = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <v-row v-for="(item,index) in placesInput.areas " :key="index">
                <v-col cols="12" sm="12" md="1" align="right">
                  <p>{{index + 1}}</p>
                </v-col>

                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
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
                      :error-messages="errors"
                      :label="$t('places.nameAr')"
                      color="secondary"
                      v-model="item.nameAr"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="1" align="right">
                  <v-btn
                    depressed
                    text
                    color="primary "
                    class="font-weight-bold"
                    x-small
                    @click="deleteVarient(index)"
                  >
                    <v-icon left>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="mt-n6" cols="12" sm="12" md="12" align="right">
              <v-btn
                depressed
                text
                color="primary "
                class="font-weight-bold text-none"
                x-small
                @click="addVarient"
              >
                <v-icon left small>mdi-plus</v-icon>
                {{$t('places.add')}}
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <AddThisPlaceButton
                :action="addThisProduct"
                :isLoading="btn_loading"
                :disabled="!invalid"
                :isIcon="false"
                :text="$t('places.addGovernorate')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { createGovernorate } from "@/places/methods/create_place.js";
import "@/core/methods/validation_rules";
import { addSubAreasToArray } from "@/places/methods/create_sub_areas.js";
import { isAdmin, isSeller, getCurrentUser } from "@/user/utlis/helper.js";

export default {
  data: () => ({
    placesInput: {
      nameEn: null,
      nameAr: null,
      areas: [
        {
          nameEn: "",
          nameAr: "",
        },
      ],
    },
    errorFromApi: "",
    errorFromApiAr: "",
    sellersVariables: {
      limit: 0,
      skip: 0,
    },
    btn_loading: false,
  }),
  components: {
    AddThisPlaceButton: () => import("@/places/components/AddButton.vue"),
  },

  methods: {
    isAdmin,
    addThisProduct() {
      this.btn_loading = true;

      createGovernorate(this.placesInput).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;
          this.$store.commit("SHOW_DRAWER");
        } else {
          this.btn_loading = false;
          // console.log(data);
          if (data.includes("nameEn_1 dup")) {
            this.btn_loading = false;
            this.errorFromApi = this.$t("inputRules.nameAlreadyExist");
          } else if (data.includes("nameAr_1 dup")) {
            this.btn_loading = false;
            this.errorFromApiAr = this.$t("inputRules.nameAlreadyExist");
          }
        }
      });
    },

    addVarient() {
      let varient = addSubAreasToArray();
      this.placesInput.areas.push(varient);
    },
    deleteVarient(index) {
      // console.log(index);
      this.placesInput.areas.splice(index, 1);
    },
  },
};
</script>

