// Title: Collections - Set (HashSet & TreeSet)
// Author: Priyadharshini S
// Created Date: 30/05/2024

import java.util.Set;
import java.util.HashSet;
import java.util.TreeSet;

class SetDemo {
    public static void main(String [] args){

        // Using HashSet
        Set<Integer> hashSet = new HashSet<>();
        hashSet.add(2);
        hashSet.add(3);
        hashSet.add(4);
        hashSet.add(5);
        hashSet.add(6);
        hashSet.add(7);
        System.out.println(hashSet.contains(5));
        System.out.println(hashSet);

        // Using TreeSet
        Set<Integer> treeSet = new TreeSet<>();
        treeSet.add(2);
        treeSet.add(5);
        treeSet.add(7);
        treeSet.add(6);
        treeSet.add(4);
        treeSet.add(3);
        System.out.println(treeSet.contains(5));
        System.out.println(treeSet);
    }
}


// Output
// true
// [2, 3, 4, 5, 6, 7]
// true
// [2, 3, 4, 5, 6, 7]