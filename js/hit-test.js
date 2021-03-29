if (frame) {
    var referenceSpace = renderer.xr.getReferenceSpace();
    var session = renderer.xr.getSession();

    if (hitTestSourceRequested === false) {

        session.requestReferenceSpace('viewer').then(function (referenceSpace) {

            session.requestHitTestSource({ space: referenceSpace }).then(function (source) {

                hitTestSource = source;

            });

        });

        session.addEventListener('end', function () {

            hitTestSourceRequested = false;
            hitTestSource = null;

        });

        hitTestSourceRequested = true;

    }

    if (hitTestSource) {

        var hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {

            var hit = hitTestResults[0];

            reticle.visible = true;
            reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

        } else {

            reticle.visible = false;

        }

    }

}