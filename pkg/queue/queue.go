package queue

import "log"

func Enqueue(task string) {
	log.Printf("[queue] added task: %s\n", task)
}

func Process() {
	log.Println("[queue] worker running...")
}
