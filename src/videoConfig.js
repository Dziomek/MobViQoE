import AWS from "./AWSconfig"

const s3 = new AWS.S3()
const bucketName = "mobviqoe-bucket"
const baseUrl = 'https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/'

export async function getFiles() {
  	try {
    	const response = await s3.listObjectsV2({ Bucket: bucketName }).promise()
		return response.Contents.map((item, index) => {
			return {
				index: index, 
				title: item.Key, 
				src: baseUrl + encodeURIComponent(item.Key) 
			}
		})
	} catch (error) {
    	console.error(error)
		return []
  	}
}
