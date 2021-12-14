import * as MediaLibrary from "expo-media-library";
import clustering from 'density-clustering'
import { ts2DateStr } from "./DateHandle";
const ClusterPhotos = async (photos, key, radius, c) => {
    const count = photos.length;
    const photoExifs = {}
    const addToPhotoExifs = async (photo, idx) => {
        const exif = await MediaLibrary.getAssetInfoAsync(photo.id);
        // console.log("EXIF");
        // console.log(exif);
        if (exif.location?.latitude) {
            photoExifs[idx] = [
                photo.creationTime,
                exif.location.longitude,
                exif.location.latitude
            ]
        }
    }
    await Promise.all(photos.map((photo, idx) => addToPhotoExifs(photo, idx)))
    const meanMap = Object.values(photoExifs).reduce(
        (a, b) => a.map(
            (e, i) => e + b[i] / count
        ),
        [0, 0, 0]
    )
    const varianceMap = Object.values(photoExifs).reduce(
        (a, b) => a.map(
            (e, i) => e + (b[i] - meanMap[i]) * (b[i] - meanMap[i])
        ),
        [0, 0, 0]
    )
    console.log("-----------exifs");
    console.log(photoExifs);
    console.log("...........exifs");
    const exifArr = []
    Object.keys(photoExifs).map((key, idx) => {
        if (photoExifs[`${idx}`]) {
            exifArr.push(
                photoExifs[`${idx}`].map(
                    (e, i) => c[i] * (e - meanMap[i]) / Math.sqrt(varianceMap[i])
                )
            )
        }

    })
    var dbscan = new clustering.DBSCAN();
    var clusters = dbscan.run(exifArr, radius, 1);

    const data = clusters.map(
        (arr) => {
            return {
                title: ts2DateStr(photos[arr[0]].creationTime, 'roughHm'),
                data: arr.map((e) => photos[e])
            }
        }
    )

    return {
        data,
        title: key
    }
}

export default ClusterPhotos;