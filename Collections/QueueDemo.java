// Title: Collections - Queue
// Author: Priyadharshini S
// Created Date: 31/05/2024

import java.util.Queue;
import java.util.LinkedList;

class QueueDemo {
    public static void main(String[] args) {
        Queue<Integer> numbers = new LinkedList<>();
        numbers.offer(1);
        numbers.offer(2);
        numbers.offer(3);
        numbers.offer(4);
        System.out.println(numbers);

        int removeNumber = numbers.poll();
        System.out.println(removeNumber);

        // Using peek() method
        int head = numbers.peek();
        System.out.println("Head of the queue: " + head);

        // Using size() method
        int size = numbers.size();
        System.out.println("Size of the queue: " + size);
    }
}

// Output
// [1, 2, 3, 4]
// 1
// Head of the queue: 2
// Size of the queue: 3
