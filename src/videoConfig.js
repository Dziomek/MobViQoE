import client from './AWSconfig'
import { ListObjectsCommand } from "@aws-sdk/client-s3"

const bucketName = "mobviqoe-bucket"
const baseUrl = "https://mobviqoe-bucket.s3.eu-central-1.amazonaws.com/"

export async function getFiles() {
  	try {
		const params = { Bucket: bucketName }
		const command = new ListObjectsCommand(params)
		const response = await client.send(command)

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
