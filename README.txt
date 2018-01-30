Testing device info.

Model:QM65H
FIRMWARE: T-KTMLAKUC-2000.6
PLATFORM: SSSP5(Tizen 3.0)

Very strange, when we call method getSystemProperty(). The return resolution 1920x1080, but device has 3840*2160:

 private static getSystemProperty(): void {
        try {
            tizen.systeminfo.getPropertyValue("DISPLAY", function (data: any) {
      			console.log(data);
            }, function (error: any) {
                console.log(data);
	          });
        } catch (e) {
            alert("Exception: " + e.message);
        }
    }

returned object with data:

SystemInfoDisplay: {

brightness: 1
dotsPerInchHeight: 316
dotsPerInchWidth: 316
physicalHeight: 86.810127
physicalWidth: 154.329114
resolutionHeight: 1080 // why 1080, we expect 2160
resolutionWidth: 1920 // why 1920, we expect 3840

}
