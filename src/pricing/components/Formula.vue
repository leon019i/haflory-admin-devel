<template>
  <div>
    <div class="pa-3">
      <v-card elevation="0" class="pa-12">
        <h2 class="primary--text mb-5">{{$t('pricing.formula')}}</h2>
        <v-row align="center">
          <v-col cols="10" class="my-0 py-0">
            <p class="secondary--text font-weight-bold">
              1.
              <span class="primary--text">{{$t('pricing.subSerViceBasePrice')}}</span>
            </p>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <p class="secondary--text font-weight-bold">
              2. {{$t('pricing.subServicePrice')}} = {{ $t('pricing.sum') }} (
              <span
                class="primary--text"
              >{{ $t('pricing.subservicePrice') }}</span>
              * {{$t('pricing.subserviceQuantity')}} )
            </p>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <p class="secondary--text font-weight-bold">
              3. {{$t('pricing.floorToFloor')}} =
              <span
                class="primary--text"
              >{{ $t('pricing.additionalFloor') }}</span>
              (
              {{ $t('pricing.ifFloor') }}
              <span
                class="primary--text"
              >{{$t('pricing.floorLimit')}}</span> )
            </p>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <p class="secondary--text font-weight-bold">
              4.
              <span class="primary--text">{{$t('pricing.areaToArea')}}</span>
              * {{$t('pricing.numberOfTransfer')}}
            </p>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <p
              class="secondary--text font-weight-bold"
            >{{$t('pricing.total')}} = 1 + 2 + 3 + 4 ({{$t('pricing.inKd')}})</p>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
