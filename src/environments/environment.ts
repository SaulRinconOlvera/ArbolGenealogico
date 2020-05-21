// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  graphicConfigurationBehavior: {
    defaultConfiguration: {
      lineWidth: 3,
      strokeStyle: '#37E',
      fillStyle: '#FFA',
      showShadow: false,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowWidth: 10
    },
    highlightConfiguration: {
      lineWidth: 5,
      strokeStyle: '#444',
      fillStyle: '#0FA',
      showShadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowWidth: 10
    },
    selectedConfiguration: {
      lineWidth: 5,
      strokeStyle: '#444',
      fillStyle: '#0DA6CA',
      showShadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowWidth: 10
    },
    highLightOnMouseOver: true
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
