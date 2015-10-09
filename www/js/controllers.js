angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  var markersArray = [];

  $scope.centerOnMe = function() {
    console.log("Centering");
    if (!$scope.map) {
        return;
    }
    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log('Got pos', pos);

      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

      deleteOverlays();
      addMarker(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  function addMarker(location) {
      var marker = new google.maps.Marker({
          position: location,
          map: $scope.map,
          draggable: true,
          scrollwheel: false,
          animation: google.maps.Animation.DROP,
          title: 'a'
      });
      markersArray.push(marker);
  }
  // Removes the overlays from the map, but keeps them in the array
  function clearOverlays() {
      if (markersArray) {
          for (i in markersArray) {
              markersArray[i].setMap(null);
          }
      }
  }
  // Shows any overlays currently in the array
  function showOverlays() {
      if (markersArray) {
          for (i in markersArray) {
              markersArray[i].setMap(map);
          }
      }
  }
  // Deletes all markers in the array by removing references to them
  function deleteOverlays() {
      if (markersArray) {
          for (i in markersArray) {
              markersArray[i].setMap(null);
          }
          markersArray.length = 0;
      }
  }
});