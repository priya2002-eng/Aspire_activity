// Title: Collections - List (ArrayList & LinkedList), Map (HashMap & TreeMap)
// Author: Priyadharshini S
// Created Date: 30/05/2024

import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Map;
import java.util.HashMap;
import java.util.TreeMap;

class ListMap {
    public static void main(String [] args){

        // Using ArrayList
        List<Integer> arrayList = new ArrayList<>();
        arrayList.add(2);
        arrayList.add(3);
        arrayList.add(4);
        arrayList.add(5);
        arrayList.add(6);
        arrayList.add(7);
        System.out.println(arrayList.contains(5));
        System.out.println(arrayList);

        // Using LinkedList
        List<Integer> linkedList = new LinkedList<>();
        linkedList.add(2);
        linkedList.add(5);
        linkedList.add(7);
        linkedList.add(6);
        linkedList.add(4);
        linkedList.add(3);
        System.out.println(linkedList.contains(5));
        System.out.println(linkedList);

        // Using HashMap
        Map<Integer, String> hashMap = new HashMap<>();
        hashMap.put(1, "One");
        hashMap.put(2, "Two");
        hashMap.put(3, "Three");
        hashMap.put(4, "Four");
        hashMap.put(5, "Five");
        System.out.println(hashMap.containsKey(3));
        System.out.println(hashMap);

        // Using TreeMap
        Map<Integer, String> treeMap = new TreeMap<>();
        treeMap.put(1, "One");
        treeMap.put(5, "Five");
        treeMap.put(4, "Four");
        treeMap.put(3, "Three");
        treeMap.put(2, "Two");
        System.out.println(treeMap.containsKey(3));
        System.out.println(treeMap);
    }
}


// Output
// true
// [2, 3, 4, 5, 6, 7]
// true
// [2, 5, 7, 6, 4, 3]
// true
// {1=One, 2=Two, 3=Three, 4=Four, 5=Five}
// true
// {1=One, 2=Two, 3=Three, 4=Four, 5=Five}


