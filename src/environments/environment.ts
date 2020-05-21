// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  graphicConfigurationBehavior: {
    defaultConfiguration: {
      lineWidth: 0.5,
      strokeStyle: '#319EE1',
      fillStyle: '#FFA',
      showShadow: false,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowWidth: 10
    },
    highlightConfiguration: {
      lineWidth: 1.2,
      strokeStyle: '#319EE1',
      fillStyle: '#0FA',
      showShadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowWidth: 10
    },
    selectedConfiguration: {
      lineWidth: 2,
      strokeStyle: '#105a83',
      fillStyle: '#0DA6CA',
      showShadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowWidth: 10
    },
    highLightOnMouseOver: true,
    sexFillConfiguration: {
      Male: 'rgba(159, 213, 235, 0.9)',
      Female: 'rgba(245, 184, 219, 0.9)'
    },
    zoomBehavior: {
      minZoom: 0.2,
      maxZoom: 1.6
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
