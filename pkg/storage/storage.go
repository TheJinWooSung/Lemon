package storage

import "log"

func Upload(path string) string {
	log.Printf("[storage] pretend upload %s to s3\n", path)
	return "https://cdn.fake.s3/" + path
}
