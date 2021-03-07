import { compareDesc, parseISO } from 'date-fns';

import { db } from '@/lib/firebase-admin';

export async function getAllFeedback(siteId) {
    try {
        const snapshot = await db
            .collection('feedback')
            .where('siteId', '==', siteId)
            .where('status', 'in', ['active', 'pending']) // it doesn't work
            .get()

        const feedback = [];

        snapshot.forEach(doc => {
            feedback.push({ id: doc.id, ...doc.data() })
        });

        feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

        return { feedback }

    } catch (error) {
        return { error }
    }
}

export async function getAllSites() {
    try {
        const snapshot = await db.collection('sites').get();
        let sites = [];

        snapshot.forEach(doc => {
            sites.push({ id: doc.id, ...doc.data() })
        });

        return { sites }

    } catch (error) {
        return { error }

    }
}

export async function getSite(siteId) {
    try {
        const doc = await db.collection('sites').doc(siteId).get();
        let site = { id: doc.id, ...doc.data() };

        return { site }

    } catch (error) {
        return { error }

    }
}


export async function getUserSites(userId) {
    const snapshot = await db
        .collection('sites')
        .where('authorId', '==', userId)
        .get();
    let sites = [];

    snapshot.forEach(doc => {
        sites.push({ id: doc.id, ...doc.data() })
    });

    return { sites }

}


export async function getUserFeedback(userId) {
    const snapshot = await db
        .collection('feedback')
        .where('status', 'in', ['active', 'pending']) // it doesn't work
        .get();
    let feedback = [];

    snapshot.forEach(doc => {
        feedback.push({ id: doc.id, ...doc.data() })
    });

    return { feedback }

}

